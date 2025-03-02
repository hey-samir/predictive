"""
API module for the Oscar Predictor application.
This module provides FastAPI endpoints for accessing the application's functionality.
"""

from typing import Dict, List, Optional, Any
from datetime import datetime

import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

# Import server modules
from server.database import get_nominations, get_model_weights
from server.data import (
    get_current_nominees, get_historical_data, get_awards_data,
    get_betting_odds, get_predictive_markets, process_historical_data
)
from server.predictor import OscarPredictor
from server.constants import CURRENT_OSCAR_YEAR

# Create FastAPI application
app = FastAPI(
    title="Oscar Predictor API",
    description="API for Oscar prediction and data access",
    version="1.0.0"
)

# Allow CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, restrict to specific domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#-----------------------------------------------------------------------------
# Data models
#-----------------------------------------------------------------------------

class NomineeBase(BaseModel):
    id: int
    category: str
    nominee_name: str
    film_title: Optional[str] = None
    won_oscar: Optional[bool] = False
    nomination_type: str
    year: int

class Nominee(NomineeBase):
    likelihood: Optional[float] = None
    betting_odds: Optional[str] = None
    market_probability: Optional[float] = None
    award_support: Optional[str] = None

class ModelWeight(BaseModel):
    category: str
    venue: str
    weight: float
    accuracy: Optional[float] = None

class HistoricalAccuracy(BaseModel):
    venue: str
    category: str
    accuracy: float
    year: int

class PredictionResponse(BaseModel):
    nominees: Dict[str, List[Nominee]]
    updated_at: str = Field(default_factory=lambda: datetime.now().isoformat())

#-----------------------------------------------------------------------------
# API endpoints
#-----------------------------------------------------------------------------

@app.get("/api/nominees", response_model=Dict[str, List[Nominee]])
async def get_nominees(year: Optional[int] = None):
    """Get Oscar nominees for the specified year."""
    try:
        # Default to current year if not specified
        if year is None:
            year = CURRENT_OSCAR_YEAR
            
        # Get nominees from database
        db_nominees = get_nominations(year=year)
        
        # If no nominees in database, generate them
        if not db_nominees:
            # Get nominees from data module
            nominees_df = get_current_nominees(year)
            
            # Convert to API format
            nominees_dict = {}
            for _, row in nominees_df.iterrows():
                category = row["category"]
                
                if category not in nominees_dict:
                    nominees_dict[category] = []
                
                nominees_dict[category].append(
                    Nominee(
                        id=len(nominees_dict.get(category, [])) + 1,
                        category=category,
                        nominee_name=row["nominee_name"],
                        film_title=row["film_title"],
                        won_oscar=row["won_oscar"],
                        nomination_type=row["nomination_type"],
                        year=year
                    )
                )
                
            return nominees_dict
        
        # Convert database nominees to API format
        nominees_dict = {}
        for nom in db_nominees:
            category = nom["category"]
            
            if category not in nominees_dict:
                nominees_dict[category] = []
            
            # Convert award support to string
            award_support = []
            for award in nom["awards"]:
                if award["won"]:
                    award_support.append(award["award_venue"])
            
            # Get betting odds and market probability
            betting_odds = None
            market_probability = None
            for ref in nom["references"]:
                if ref["reference_type"] == "betting_odds":
                    betting_odds = ref["value"]
                elif ref["reference_type"] == "predictive_market":
                    market_probability = ref["value"]
            
            nominees_dict[category].append(
                Nominee(
                    id=nom["id"],
                    category=category,
                    nominee_name=nom["nominee_name"],
                    film_title=nom["film_title"],
                    won_oscar=nom["won_oscar"],
                    nomination_type=nom["nomination_type"],
                    year=nom["year"],
                    likelihood=None,  # Will be populated by prediction
                    betting_odds=betting_odds,
                    market_probability=market_probability,
                    award_support=", ".join(award_support) if award_support else None
                )
            )
        
        return nominees_dict
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/model-weights", response_model=Dict[str, List[ModelWeight]])
async def get_weights(year: Optional[int] = None):
    """Get model weights for the specified year."""
    try:
        # Default to current year if not specified
        if year is None:
            year = CURRENT_OSCAR_YEAR
            
        # Get weights from database
        db_weights = get_model_weights(year=year)
        
        # Convert to API format
        weights_dict = {}
        for weight in db_weights:
            category = weight["category"]
            
            if category not in weights_dict:
                weights_dict[category] = []
            
            weights_dict[category].append(
                ModelWeight(
                    category=category,
                    venue=weight["award_venue"],
                    weight=weight["weight"],
                    accuracy=weight["accuracy"]
                )
            )
        
        return weights_dict
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/historical-accuracy", response_model=Dict[str, List[HistoricalAccuracy]])
async def get_historical_accuracy(recent_years: Optional[int] = None):
    """Get historical accuracy data for award venues."""
    try:
        # Get historical data
        historical_df = get_historical_data(recent_years)
        
        # Train predictor to get venue strengths
        predictor = OscarPredictor()
        predictor.train(historical_df)
        
        # Analyze venue strength
        strength_df = predictor.analyze_venue_strength(historical_df)
        
        # Convert to API format
        accuracy_dict = {}
        for _, row in strength_df.iterrows():
            venue = row["Award Venue"]
            
            if venue not in accuracy_dict:
                accuracy_dict[venue] = []
            
            accuracy_dict[venue].append(
                HistoricalAccuracy(
                    venue=venue,
                    category=row["Category"],
                    accuracy=row["Historical Accuracy"],
                    year=CURRENT_OSCAR_YEAR
                )
            )
        
        return accuracy_dict
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/run-predictions", response_model=PredictionResponse)
async def run_predictions(year: Optional[int] = None):
    """Run predictions for the specified year."""
    try:
        # Default to current year if not specified
        if year is None:
            year = CURRENT_OSCAR_YEAR
            
        # Get data for predictions
        nominees_df = get_current_nominees(year)
        awards_df = get_awards_data(year)
        betting_df = get_betting_odds(year)
        markets_df = get_predictive_markets(year)
        
        # Get historical data for training
        historical_df = get_historical_data(recent_years=10)
        processed_df = process_historical_data(historical_df)
        
        # Initialize and train predictor
        predictor = OscarPredictor()
        predictor.train(processed_df)
        
        # Run predictions
        predictions_df = predictor.predict(nominees_df, awards_df)
        
        # Merge with betting data
        merged_df = predictor.merge_with_betting_data(
            predictions_df, betting_df, markets_df
        )
        
        # Convert to API format
        nominees_dict = {}
        for _, row in merged_df.iterrows():
            category = row["Award Category"]
            
            if category not in nominees_dict:
                nominees_dict[category] = []
            
            likelihood = row.get("Model Likelihood")
            betting_odds = row.get("Betting Odds")
            market_prob = row.get("Market Probability")
            
            # Make sure we have numeric values
            if likelihood is not None and pd.isna(likelihood):
                likelihood = None
            if betting_odds is not None and pd.isna(betting_odds):
                betting_odds = None
            if market_prob is not None and pd.isna(market_prob):
                market_prob = None
                
            # Find nomination type
            nomination_type = "Maker"  # Default
            for _, nom in nominees_df.iterrows():
                if (nom["category"] == category and 
                    nom["nominee_name"] == row["Nominee Name"]):
                    nomination_type = nom["nomination_type"]
                    break
            
            nominees_dict[category].append(
                Nominee(
                    id=len(nominees_dict.get(category, [])) + 1,
                    category=category,
                    nominee_name=row["Nominee Name"],
                    film_title=row["Film Title"],
                    won_oscar=False,  # For predictions, we don't know yet
                    nomination_type=nomination_type,
                    year=year,
                    likelihood=likelihood,
                    betting_odds=betting_odds,
                    market_probability=market_prob,
                    award_support=row.get("Awards Venue Support")
                )
            )
        
        response = PredictionResponse(
            nominees=nominees_dict,
            updated_at=datetime.now().isoformat()
        )
        
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


#-----------------------------------------------------------------------------
# Server startup
#-----------------------------------------------------------------------------

@app.on_event("startup")
async def startup_event():
    """Initialize the application on startup."""
    # Additional startup logic can go here
    pass


#-----------------------------------------------------------------------------
# Main entrypoint
#-----------------------------------------------------------------------------

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5001)