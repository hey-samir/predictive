"""Database setup and models for the application."""

import os
from sqlalchemy import create_engine, Column, Integer, String, Boolean, Float, Date, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime

# Get database URL from environment variable
DATABASE_URL = os.environ.get('DATABASE_URL')

# Create engine and session
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
Base = declarative_base()

class Nomination(Base):
    """
    Model for Oscar nominations.
    """
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
    """
    Model for tracking wins at other award shows for each nomination.
    """
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
    """
    Model for external references for each nomination (betting odds, review scores, etc).
    """
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
    """
    Model for tracking the predictive strength of each award venue for each category.
    """
    __tablename__ = "model_weights"
    
    id = Column(Integer, primary_key=True)
    year = Column(Integer, nullable=False)
    category = Column(String(100), nullable=False)
    award_venue = Column(String(100), nullable=False)  # BAFTA, Golden Globe, etc.
    weight = Column(Float, nullable=False)  # The predictive weight/strength
    accuracy = Column(Float)  # Historical accuracy percentage
    
    def __repr__(self):
        return f"<ModelWeight(id={self.id}, venue='{self.award_venue}', category='{self.category}', weight={self.weight})>"

def create_tables():
    """Create all tables in the database."""
    Base.metadata.create_all(engine)

def get_session():
    """Get a session for database operations."""
    try:
        from sqlalchemy import text
        session = Session()
        # Test connection
        session.execute(text("SELECT 1"))
        return session
    except Exception as e:
        print(f"Error creating database session: {e}")
        return None