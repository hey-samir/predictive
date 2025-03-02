"""
Consolidated database module for the Oscar Predictor application.
This module combines the functionality from db_setup.py and operations.py.
"""

import os
from datetime import datetime
from typing import Dict, List, Optional, Any, Tuple

import pandas as pd
from sqlalchemy import create_engine, Column, Integer, String, Float, Boolean, ForeignKey, Date
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship, Session
from sqlalchemy.sql import text

# Initialize SQLAlchemy
DATABASE_URL = os.environ.get("DATABASE_URL", "sqlite:///database/oscar_predictor.db")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

#-----------------------------------------------------------------------------
# Database Models (from db_setup.py)
#-----------------------------------------------------------------------------

class Nomination(Base):
    """Model for Oscar nominations."""
    __tablename__ = "nominations"

    id = Column(Integer, primary_key=True)
    year = Column(Integer, nullable=False)
    category = Column(String(100), nullable=False)
    nomination_type = Column(String(50), nullable=False)  # Maker, Performer, Creator, Crafter
    nominee_name = Column(String(200), nullable=False)
    film_title = Column(String(200))
    won_oscar = Column(Boolean, default=False)
    created_at = Column(Date, default=datetime.now().date())

    # Relationships
    awards = relationship("AwardWin", back_populates="nomination", cascade="all, delete-orphan")
    references = relationship("Reference", back_populates="nomination", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Nomination(id={self.id}, year={self.year}, category='{self.category}', nominee='{self.nominee_name}')>"


class AwardWin(Base):
    """Model for tracking wins at other award shows for each nomination."""
    __tablename__ = "award_wins"

    id = Column(Integer, primary_key=True)
    nomination_id = Column(Integer, ForeignKey("nominations.id"), nullable=False)
    award_venue = Column(String(100), nullable=False)  # BAFTA, Golden Globe, etc.
    award_category = Column(String(200))
    won = Column(Boolean, default=False)

    # Relationships
    nomination = relationship("Nomination", back_populates="awards")

    def __repr__(self):
        return f"<AwardWin(id={self.id}, venue='{self.award_venue}', won={self.won})>"


class Reference(Base):
    """Model for external references for each nomination (betting odds, review scores, etc)."""
    __tablename__ = "references"

    id = Column(Integer, primary_key=True)
    nomination_id = Column(Integer, ForeignKey("nominations.id"), nullable=False)
    reference_type = Column(String(50), nullable=False)  # betting_odds, predictive_market, critics_score, audience_score
    value = Column(Float)
    source = Column(String(100))  # Source of the data (e.g., Rotten Tomatoes, IMDB, specific betting site)

    # Relationships
    nomination = relationship("Nomination", back_populates="references")

    def __repr__(self):
        return f"<Reference(id={self.id}, type='{self.reference_type}', value={self.value})>"


class ModelWeight(Base):
    """Model for tracking the predictive strength of each award venue for each category."""
    __tablename__ = "model_weights"

    id = Column(Integer, primary_key=True)
    year = Column(Integer, nullable=False)
    category = Column(String(100), nullable=False)
    award_venue = Column(String(100), nullable=False)  # BAFTA, Golden Globe, etc.
    weight = Column(Float, nullable=False)  # The predictive weight/strength
    accuracy = Column(Float)  # Historical accuracy percentage

    def __repr__(self):
        return f"<ModelWeight(id={self.id}, category='{self.category}', venue='{self.award_venue}', weight={self.weight})>"


#-----------------------------------------------------------------------------
# Database Operations (from operations.py)
#-----------------------------------------------------------------------------

def create_tables():
    """Create all tables in the database."""
    Base.metadata.create_all(bind=engine)


def get_session() -> Session:
    """Get a session for database operations."""
    return SessionLocal()


def get_nominations(year: Optional[int] = None, category: Optional[str] = None, 
                    nomination_type: Optional[str] = None) -> List[Dict[str, Any]]:
    """
    Get nominations from the database.
    
    Args:
        year: Filter by year
        category: Filter by category
        nomination_type: Filter by nomination type (Maker, Performer, Creator, Crafter)
        
    Returns:
        List of dictionaries with nomination data
    """
    with get_session() as session:
        query = session.query(Nomination)
        
        # Apply filters
        if year is not None:
            query = query.filter(Nomination.year == year)
        if category is not None:
            query = query.filter(Nomination.category == category)
        if nomination_type is not None:
            query = query.filter(Nomination.nomination_type == nomination_type)
            
        # Execute query with relationships
        nominations = query.all()
        
        # Convert to dictionaries
        result = []
        for nom in nominations:
            nom_dict = {
                "id": nom.id,
                "year": nom.year,
                "category": nom.category,
                "nomination_type": nom.nomination_type,
                "nominee_name": nom.nominee_name,
                "film_title": nom.film_title,
                "won_oscar": nom.won_oscar,
                "created_at": nom.created_at.isoformat() if nom.created_at else None,
                "awards": [],
                "references": []
            }
            
            # Add awards
            for award in nom.awards:
                nom_dict["awards"].append({
                    "id": award.id,
                    "award_venue": award.award_venue,
                    "award_category": award.award_category,
                    "won": award.won
                })
                
            # Add references
            for ref in nom.references:
                nom_dict["references"].append({
                    "id": ref.id,
                    "reference_type": ref.reference_type,
                    "value": ref.value,
                    "source": ref.source
                })
                
            result.append(nom_dict)
            
        return result


def get_model_weights(year: Optional[int] = None, category: Optional[str] = None) -> List[Dict[str, Any]]:
    """
    Get model weights from the database.
    
    Args:
        year: Filter by year
        category: Filter by category
        
    Returns:
        List of dictionaries with model weight data
    """
    with get_session() as session:
        query = session.query(ModelWeight)
        
        # Apply filters
        if year is not None:
            query = query.filter(ModelWeight.year == year)
        if category is not None:
            query = query.filter(ModelWeight.category == category)
            
        # Execute query
        weights = query.all()
        
        # Convert to dictionaries
        result = []
        for weight in weights:
            result.append({
                "id": weight.id,
                "year": weight.year,
                "category": weight.category,
                "award_venue": weight.award_venue,
                "weight": weight.weight,
                "accuracy": weight.accuracy
            })
            
        return result


def get_nominations_dataframe(year: Optional[int] = None) -> pd.DataFrame:
    """
    Get nominations as a pandas DataFrame.
    
    Args:
        year: Filter by year
        
    Returns:
        DataFrame with nominations data
    """
    nominations = get_nominations(year=year)
    
    # Flatten the data for DataFrame
    flattened_data = []
    for nom in nominations:
        nom_data = {
            "id": nom["id"],
            "year": nom["year"],
            "category": nom["category"],
            "nomination_type": nom["nomination_type"],
            "nominee_name": nom["nominee_name"],
            "film_title": nom["film_title"],
            "won_oscar": nom["won_oscar"]
        }
        
        # Add award wins as columns
        for award in nom["awards"]:
            venue = award["award_venue"]
            nom_data[f"{venue}_won"] = award["won"]
            
        # Add references as columns
        for ref in nom["references"]:
            ref_type = ref["reference_type"]
            nom_data[f"{ref_type}"] = ref["value"]
            nom_data[f"{ref_type}_source"] = ref["source"]
            
        flattened_data.append(nom_data)
        
    return pd.DataFrame(flattened_data)


def get_model_weights_dataframe(year: Optional[int] = None) -> pd.DataFrame:
    """
    Get model weights as a pandas DataFrame.
    
    Args:
        year: Filter by year
        
    Returns:
        DataFrame with model weights data
    """
    weights = get_model_weights(year=year)
    return pd.DataFrame(weights)


def add_nomination(nomination_data: Dict[str, Any]) -> int:
    """
    Add a new nomination to the database.
    
    Args:
        nomination_data: Dictionary with nomination data
        
    Returns:
        ID of the newly created nomination
    """
    with get_session() as session:
        # Extract awards and references
        awards_data = nomination_data.pop("awards", [])
        references_data = nomination_data.pop("references", [])
        
        # Create nomination
        nomination = Nomination(**nomination_data)
        session.add(nomination)
        session.flush()  # Flush to get the ID
        
        # Add awards
        for award_data in awards_data:
            award_data["nomination_id"] = nomination.id
            award = AwardWin(**award_data)
            session.add(award)
            
        # Add references
        for reference_data in references_data:
            reference_data["nomination_id"] = nomination.id
            reference = Reference(**reference_data)
            session.add(reference)
            
        session.commit()
        return nomination.id