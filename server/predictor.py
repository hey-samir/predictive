"""
Oscar prediction model for the Oscar Predictor application.
This module is based on models/predictor.py but with enhanced functionality.
"""

import pandas as pd
import numpy as np
from typing import Dict, List, Optional, Tuple, Any
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler

from server.constants import AWARD_VENUES


class OscarPredictor:
    """Model to predict Oscar winners based on other award show results."""
    
    def __init__(self):
        """Initialize the Oscar predictor model."""
        self.models = {}  # Dictionary to store category-specific models
        self.scalers = {}  # Dictionary to store category-specific scalers
        self.feature_importances = {}  # Dictionary to store feature importances for each category
        self.trained = False
    
    def train(self, data: pd.DataFrame) -> None:
        """
        Train the model on historical data.
        
        Args:
            data: DataFrame with historical Oscar data
        """
        # Group data by category
        categories = data["category"].unique()
        
        for category in categories:
            category_data = data[data["category"] == category]
            
            # Skip categories with insufficient data
            if len(category_data) < 10:
                continue
            
            # Prepare data for this category
            X, y = self._prepare_data(category_data)
            
            if X.empty or len(y) == 0:
                continue
            
            # Scale features
            scaler = StandardScaler()
            X_scaled = pd.DataFrame(scaler.fit_transform(X), columns=X.columns)
            
            # Train random forest model
            model = RandomForestClassifier(
                n_estimators=100, 
                max_depth=5,
                random_state=42
            )
            model.fit(X_scaled, y)
            
            # Store model and scaler
            self.models[category] = model
            self.scalers[category] = scaler
            
            # Store feature importances
            self.feature_importances[category] = dict(zip(X.columns, model.feature_importances_))
        
        self.trained = True
    
    def _prepare_data(self, data: pd.DataFrame) -> Tuple[pd.DataFrame, pd.Series]:
        """
        Prepare data for modeling.
        
        Args:
            data: DataFrame with Oscar data for a specific category
            
        Returns:
            Tuple of (features, target)
        """
        # Identify award venue columns
        award_columns = [f"{venue}_won" for venue in AWARD_VENUES]
        
        # Check if we have any award columns
        available_award_columns = [col for col in award_columns if col in data.columns]
        if not available_award_columns:
            return pd.DataFrame(), pd.Series()
        
        # Additional feature columns (e.g., critics scores)
        additional_columns = []
        for col in ["critics_score", "audience_score"]:
            if col in data.columns:
                additional_columns.append(col)
        
        # Combine all feature columns
        feature_columns = available_award_columns + additional_columns
        
        # Make sure we have at least some features
        if not feature_columns:
            return pd.DataFrame(), pd.Series()
        
        # Create feature matrix and target vector
        X = data[feature_columns]
        y = data["won_oscar"]
        
        return X, y
    
    def predict(self, nominees: pd.DataFrame, awards_data: pd.DataFrame, 
                recent_only: bool = False, recent_years: Optional[int] = None) -> pd.DataFrame:
        """
        Predict Oscar winners for current nominees.
        
        Args:
            nominees: DataFrame with current Oscar nominees
            awards_data: DataFrame with current awards data from other venues
            recent_only: Whether to use only recent years model
            recent_years: Number of recent years to consider if recent_only is True
            
        Returns:
            DataFrame with predictions
        """
        if not self.trained:
            raise ValueError("Model has not been trained yet.")
        
        # Merge nominees with awards data
        from server.data import merge_award_data
        merged_data = merge_award_data(nominees, awards_data)
        
        # Prepare results DataFrame
        results = []
        
        # Group nominees by category
        categories = merged_data["category"].unique()
        
        for category in categories:
            # Get nominees for this category
            category_nominees = merged_data[merged_data["category"] == category]
            
            # Check if we have a model for this category
            if category not in self.models:
                # If not, use simple heuristic
                for _, nominee in category_nominees.iterrows():
                    # Count number of award wins
                    award_columns = [f"{venue}_won" for venue in AWARD_VENUES]
                    available_columns = [col for col in award_columns if col in nominee.index]
                    awards_won = sum(nominee[col] for col in available_columns)
                    total_awards = len(available_columns)
                    
                    # Calculate likelihood based on percentage of awards won
                    likelihood = (awards_won / total_awards * 100) if total_awards > 0 else 50
                    
                    # Get award support
                    award_support = [venue for venue in AWARD_VENUES 
                                    if f"{venue}_won" in nominee and nominee[f"{venue}_won"]]
                    award_support_str = ", ".join(award_support) if award_support else "None"
                    
                    results.append({
                        "Award Category": category,
                        "Nominee Name": nominee["nominee_name"],
                        "Film Title": nominee["film_title"],
                        "Model Likelihood": likelihood,
                        "Awards Venue Support": award_support_str
                    })
            else:
                # Use trained model for prediction
                model = self.models[category]
                scaler = self.scalers[category]
                
                # Get category weights
                category_weights = self.feature_importances[category]
                
                # Prepare features for each nominee
                for _, nominee in category_nominees.iterrows():
                    features = self._prepare_prediction_features(nominee, awards_data, category_weights)
                    
                    # Calculate likelihood
                    likelihood = self._calculate_likelihood(features, category_weights)
                    
                    # Get award support
                    award_support = self._get_award_support(features)
                    
                    results.append({
                        "Award Category": category,
                        "Nominee Name": nominee["nominee_name"],
                        "Film Title": nominee["film_title"],
                        "Model Likelihood": likelihood,
                        "Awards Venue Support": award_support
                    })
        
        # Convert to DataFrame
        predictions_df = pd.DataFrame(results)
        
        # Sort predictions within each category by likelihood
        predictions_df = predictions_df.sort_values(
            by=["Award Category", "Model Likelihood"], 
            ascending=[True, False]
        )
        
        return predictions_df
    
    def _prepare_prediction_features(self, nominee: pd.Series, awards_data: pd.DataFrame, 
                                    category_weights: Dict[str, float]) -> Dict[str, Any]:
        """
        Prepare features for prediction.
        
        Args:
            nominee: Series with nominee data
            awards_data: DataFrame with awards data for the relevant category
            category_weights: Dictionary with weights for each venue
            
        Returns:
            Feature dictionary for prediction
        """
        features = {}
        
        # Add award wins
        for venue in AWARD_VENUES:
            feature_name = f"{venue}_won"
            if feature_name in nominee:
                features[feature_name] = nominee[feature_name]
            else:
                features[feature_name] = False
        
        # Add additional features
        for feature in ["critics_score", "audience_score"]:
            if feature in nominee:
                features[feature] = nominee[feature]
        
        return features
    
    def _calculate_likelihood(self, features: Dict[str, Any], 
                             category_weights: Dict[str, float]) -> float:
        """
        Calculate prediction likelihood based on features and weights.
        
        Args:
            features: Feature dictionary for the nominee
            category_weights: Dictionary with weights for each venue
            
        Returns:
            Likelihood score (0-100)
        """
        # Initialize likelihood
        likelihood = 50.0  # Base likelihood
        
        # Total weight for normalization
        total_weight = sum(category_weights.values())
        
        if total_weight == 0:
            return likelihood
        
        # Calculate weighted score
        weighted_score = 0
        
        for feature, value in features.items():
            if feature in category_weights and category_weights[feature] > 0:
                weight = category_weights[feature] / total_weight
                
                if isinstance(value, bool):
                    # Boolean features (award wins)
                    weighted_score += weight * (100 if value else 0)
                else:
                    # Numeric features (e.g., critics score)
                    # Normalize to 0-100 scale
                    normalized_value = min(max(value, 0), 100)
                    weighted_score += weight * normalized_value
        
        # Adjust likelihood based on weighted score
        adjusted_likelihood = 20 + weighted_score * 0.8  # Scale from 20-100
        
        return adjusted_likelihood
    
    def _get_award_support(self, features: Dict[str, Any]) -> str:
        """
        Get a string listing the award venues that support this nominee.
        
        Args:
            features: Feature dictionary for the nominee
            
        Returns:
            String with award venues that chose this nominee as winner
        """
        supporting_venues = []
        
        for venue in AWARD_VENUES:
            feature_name = f"{venue}_won"
            if feature_name in features and features[feature_name]:
                supporting_venues.append(venue)
        
        if not supporting_venues:
            return "None"
        
        return ", ".join(supporting_venues)
    
    def merge_with_betting_data(self, predictions: pd.DataFrame, 
                             betting_odds: pd.DataFrame, 
                             predictive_markets: pd.DataFrame) -> pd.DataFrame:
        """
        Merge predictions with betting odds and predictive markets data.
        
        Args:
            predictions: DataFrame with model predictions
            betting_odds: DataFrame with betting odds
            predictive_markets: DataFrame with predictive markets data
            
        Returns:
            Merged DataFrame
        """
        # Copy predictions to avoid modifying the original
        merged = predictions.copy()
        
        # Add betting odds
        if not betting_odds.empty:
            # Convert odds to probability if needed
            if "probability" not in betting_odds.columns and "odds_value" in betting_odds.columns:
                betting_odds["probability"] = 100 / betting_odds["odds_value"]
            
            # Prepare for merge
            betting_data = betting_odds[["category", "nominee_name", "probability"]].copy()
            betting_data.columns = ["Award Category", "Nominee Name", "Betting Odds"]
            
            # Merge
            merged = pd.merge(
                merged, 
                betting_data, 
                on=["Award Category", "Nominee Name"], 
                how="left"
            )
        
        # Add predictive markets
        if not predictive_markets.empty:
            # Prepare for merge
            markets_data = predictive_markets[["category", "nominee_name", "probability"]].copy()
            markets_data.columns = ["Award Category", "Nominee Name", "Market Probability"]
            
            # Merge
            merged = pd.merge(
                merged, 
                markets_data, 
                on=["Award Category", "Nominee Name"], 
                how="left"
            )
        
        return merged
    
    def analyze_venue_strength(self, historical_data: pd.DataFrame) -> pd.DataFrame:
        """
        Analyze the predictive strength of each award venue for each Oscar category.
        
        Args:
            historical_data: DataFrame with historical Oscar data
            
        Returns:
            DataFrame with predictive strength analysis
        """
        results = []
        
        # Group by category
        for category in historical_data["category"].unique():
            category_data = historical_data[historical_data["category"] == category]
            
            # Analyze each venue
            for venue in AWARD_VENUES:
                venue_column = f"{venue}_won"
                
                # Skip if venue data not available
                if venue_column not in category_data.columns:
                    continue
                
                # Filter to rows where venue prediction exists
                venue_data = category_data[~category_data[venue_column].isna()]
                
                if len(venue_data) == 0:
                    continue
                
                # Calculate agreement with Oscar
                agreement = (venue_data[venue_column] == venue_data["won_oscar"]).mean() * 100
                
                # Get feature importance if available
                importance = 0
                if category in self.feature_importances and venue_column in self.feature_importances[category]:
                    importance = self.feature_importances[category][venue_column] * 100
                
                # Add to results
                results.append({
                    "Category": category,
                    "Award Venue": venue,
                    "Historical Accuracy": agreement,
                    "Predictive Strength": importance,
                    "Sample Size": len(venue_data)
                })
        
        return pd.DataFrame(results)