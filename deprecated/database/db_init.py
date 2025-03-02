"""Initialization functions for the database."""

from database.db_setup import Nomination, AwardWin, Reference, ModelWeight, get_session
from utils.constants import AWARD_VENUES, OSCAR_CATEGORIES, NOMINATION_TYPES
import random
from datetime import datetime

def init_database():
    """Initialize the database with tables and sample data."""
    session = get_session()
    if not session:
        print("Failed to connect to database.")
        return False
    
    try:
        # Add sample data
        add_sample_nominations(session)
        add_sample_model_weights(session)
        
        # Commit the changes
        session.commit()
        print("Sample data added to database.")
        return True
    except Exception as e:
        # Roll back on error
        session.rollback()
        print(f"Error initializing database: {e}")
        return False
    finally:
        # Close the session
        session.close()

def add_sample_nominations(session):
    """Add sample nomination data to the database."""
    # Get current year
    current_year = datetime.now().year
    
    # Add 2023 nominations (actually awarded in early 2024)
    year = 2023
    
    # Best Picture nominees
    best_picture_nominees = [
        {"nominee_name": "Oppenheimer", "film_title": "Oppenheimer", "won_oscar": True},
        {"nominee_name": "Poor Things", "film_title": "Poor Things", "won_oscar": False},
        {"nominee_name": "Killers of the Flower Moon", "film_title": "Killers of the Flower Moon", "won_oscar": False},
        {"nominee_name": "The Zone of Interest", "film_title": "The Zone of Interest", "won_oscar": False},
        {"nominee_name": "American Fiction", "film_title": "American Fiction", "won_oscar": False},
        {"nominee_name": "Barbie", "film_title": "Barbie", "won_oscar": False},
        {"nominee_name": "Maestro", "film_title": "Maestro", "won_oscar": False},
        {"nominee_name": "Past Lives", "film_title": "Past Lives", "won_oscar": False},
        {"nominee_name": "Anatomy of a Fall", "film_title": "Anatomy of a Fall", "won_oscar": False},
        {"nominee_name": "The Holdovers", "film_title": "The Holdovers", "won_oscar": False}
    ]
    
    for nominee_data in best_picture_nominees:
        nomination = Nomination(
            year=year,
            category="Best Picture",
            nomination_type="Maker",
            nominee_name=nominee_data["nominee_name"],
            film_title=nominee_data["film_title"],
            won_oscar=nominee_data["won_oscar"]
        )
        session.add(nomination)
        
        # Add awards from other venues
        if nominee_data["nominee_name"] == "Oppenheimer":
            # Won at all award venues
            for venue in AWARD_VENUES:
                award = AwardWin(
                    nomination=nomination,
                    award_venue=venue,
                    award_category=f"{venue} Best Picture equivalent",
                    won=True
                )
                session.add(award)
                
            # Add reference data
            reference1 = Reference(
                nomination=nomination,
                reference_type="critics_score",
                value=93.0,
                source="Rotten Tomatoes"
            )
            session.add(reference1)
            
            reference2 = Reference(
                nomination=nomination,
                reference_type="audience_score",
                value=91.0,
                source="Rotten Tomatoes"
            )
            session.add(reference2)
            
            reference3 = Reference(
                nomination=nomination,
                reference_type="betting_odds",
                value=80.0,
                source="Average Bookmakers"
            )
            session.add(reference3)
    
    # Director nominees
    director_nominees = [
        {"nominee_name": "Christopher Nolan", "film_title": "Oppenheimer", "won_oscar": True},
        {"nominee_name": "Martin Scorsese", "film_title": "Killers of the Flower Moon", "won_oscar": False},
        {"nominee_name": "Yorgos Lanthimos", "film_title": "Poor Things", "won_oscar": False},
        {"nominee_name": "Jonathan Glazer", "film_title": "The Zone of Interest", "won_oscar": False},
        {"nominee_name": "Justine Triet", "film_title": "Anatomy of a Fall", "won_oscar": False}
    ]
    
    for nominee_data in director_nominees:
        nomination = Nomination(
            year=year,
            category="Directing",
            nomination_type="Creator",
            nominee_name=nominee_data["nominee_name"],
            film_title=nominee_data["film_title"],
            won_oscar=nominee_data["won_oscar"]
        )
        session.add(nomination)
        
        # Add awards from other venues for Nolan
        if nominee_data["nominee_name"] == "Christopher Nolan":
            for venue in ["BAFTA", "Golden Globes", "Critics Choice", "DGA"]:
                award = AwardWin(
                    nomination=nomination,
                    award_venue=venue,
                    award_category=f"{venue} Director equivalent",
                    won=True
                )
                session.add(award)
    
    # Actor nominees
    actor_nominees = [
        {"nominee_name": "Cillian Murphy", "film_title": "Oppenheimer", "won_oscar": True},
        {"nominee_name": "Bradley Cooper", "film_title": "Maestro", "won_oscar": False},
        {"nominee_name": "Colman Domingo", "film_title": "Rustin", "won_oscar": False},
        {"nominee_name": "Paul Giamatti", "film_title": "The Holdovers", "won_oscar": False},
        {"nominee_name": "Jeffrey Wright", "film_title": "American Fiction", "won_oscar": False}
    ]
    
    for nominee_data in actor_nominees:
        nomination = Nomination(
            year=year,
            category="Actor in a Leading Role",
            nomination_type="Performer",
            nominee_name=nominee_data["nominee_name"],
            film_title=nominee_data["film_title"],
            won_oscar=nominee_data["won_oscar"]
        )
        session.add(nomination)

def add_sample_model_weights(session):
    """Add sample model weights to the database."""
    year = datetime.now().year
    
    # Add weights for each category and venue
    for category in OSCAR_CATEGORIES:
        for venue in AWARD_VENUES:
            # Generate a random weight between 0.5 and 0.95
            weight = random.uniform(0.5, 0.95)
            
            # Higher weights for more predictive venues
            if venue in ["BAFTA", "SAG"] and category in NOMINATION_TYPES["Performer"]:
                weight = random.uniform(0.85, 0.95)
            elif venue == "DGA" and category == "Directing":
                weight = random.uniform(0.9, 0.98)
            elif venue == "PGA" and category == "Best Picture":
                weight = random.uniform(0.85, 0.95)
            elif venue == "WGA" and "Writing" in category:
                weight = random.uniform(0.85, 0.95)
            
            model_weight = ModelWeight(
                year=year,
                category=category,
                award_venue=venue,
                weight=weight,
                accuracy=weight * 100  # Convert to percentage
            )
            session.add(model_weight)