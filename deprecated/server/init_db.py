"""
Consolidated database initialization module for the Oscar Predictor application.
This module combines the functionality from db_init.py and db_init_script.py.
"""

import argparse
import sys
from datetime import datetime

from server.database import (
    get_session, create_tables, Nomination, AwardWin, Reference, ModelWeight
)

def add_sample_nominations(session):
    """Add sample nomination data to the database."""
    
    # Check if we already have data
    if session.query(Nomination).count() > 0:
        print("Database already contains nominations. Skipping sample data.")
        return
    
    # Sample data for 2025 Oscar nominations
    categories = {
        "Best Picture": "Maker",
        "Best Director": "Creator",
        "Best Actor": "Performer",
        "Best Actress": "Performer",
        "Best Supporting Actor": "Performer",
        "Best Supporting Actress": "Performer",
        "Best Original Screenplay": "Creator",
        "Best Adapted Screenplay": "Creator",
        "Best Cinematography": "Crafter",
        "Best Film Editing": "Crafter"
    }
    
    nominees = {
        "Best Picture": [
            {"name": "Dune: Part Two", "won": False},
            {"name": "Oppenheimer", "won": True},
            {"name": "The Zone of Interest", "won": False},
            {"name": "Killers of the Flower Moon", "won": False},
            {"name": "Poor Things", "won": False}
        ],
        "Best Director": [
            {"name": "Christopher Nolan", "film": "Oppenheimer", "won": True},
            {"name": "Martin Scorsese", "film": "Killers of the Flower Moon", "won": False},
            {"name": "Yorgos Lanthimos", "film": "Poor Things", "won": False},
            {"name": "Denis Villeneuve", "film": "Dune: Part Two", "won": False},
            {"name": "Jonathan Glazer", "film": "The Zone of Interest", "won": False}
        ],
        "Best Actor": [
            {"name": "Cillian Murphy", "film": "Oppenheimer", "won": True},
            {"name": "Paul Giamatti", "film": "The Holdovers", "won": False},
            {"name": "Leonardo DiCaprio", "film": "Killers of the Flower Moon", "won": False},
            {"name": "Bradley Cooper", "film": "Maestro", "won": False},
            {"name": "Colman Domingo", "film": "Rustin", "won": False}
        ],
        "Best Actress": [
            {"name": "Emma Stone", "film": "Poor Things", "won": True},
            {"name": "Lily Gladstone", "film": "Killers of the Flower Moon", "won": False},
            {"name": "Carey Mulligan", "film": "Maestro", "won": False},
            {"name": "Sandra Hüller", "film": "Anatomy of a Fall", "won": False},
            {"name": "Annette Bening", "film": "Nyad", "won": False}
        ]
    }
    
    # Award venues
    award_venues = ["BAFTA", "Golden Globes", "Critics Choice", "SAG", "PGA", "DGA"]
    
    # Add nominations
    for category, nomination_type in categories.items():
        if category in nominees:
            for nominee_data in nominees[category]:
                # Create nomination
                nomination = Nomination(
                    year=2025,
                    category=category,
                    nomination_type=nomination_type,
                    nominee_name=nominee_data["name"],
                    film_title=nominee_data.get("film", nominee_data["name"]),
                    won_oscar=nominee_data["won"],
                    created_at=datetime.now().date()
                )
                session.add(nomination)
                session.flush()  # To get the ID
                
                # Add random award wins
                import random
                for venue in award_venues:
                    # Skip irrelevant awards (e.g., SAG for non-acting categories)
                    if venue == "SAG" and nomination_type != "Performer":
                        continue
                    if venue == "DGA" and category != "Best Director":
                        continue
                    if venue == "PGA" and category != "Best Picture":
                        continue
                    
                    # Award wins are more likely for Oscar winners
                    won_probability = 0.8 if nominee_data["won"] else 0.2
                    
                    award = AwardWin(
                        nomination_id=nomination.id,
                        award_venue=venue,
                        award_category=category,
                        won=random.random() < won_probability
                    )
                    session.add(award)
                
                # Add betting odds and predictive markets
                if nominee_data["won"]:
                    betting_value = random.uniform(1.1, 2.0)  # Lower odds for favorites
                    market_value = random.uniform(70, 90)  # Higher probability for favorites
                else:
                    betting_value = random.uniform(3.0, 10.0)  # Higher odds for underdogs
                    market_value = random.uniform(10, 40)  # Lower probability for underdogs
                
                session.add(Reference(
                    nomination_id=nomination.id,
                    reference_type="betting_odds",
                    value=betting_value,
                    source="BetSample"
                ))
                
                session.add(Reference(
                    nomination_id=nomination.id,
                    reference_type="predictive_market",
                    value=market_value,
                    source="PredictIt"
                ))
    
    session.commit()
    print("Sample nominations added to database.")


def add_sample_model_weights(session):
    """Add sample model weights to the database."""
    
    # Check if we already have data
    if session.query(ModelWeight).count() > 0:
        print("Database already contains model weights. Skipping sample data.")
        return
    
    # Sample data for model weights
    categories = ["Best Picture", "Best Director", "Best Actor", "Best Actress", 
                 "Best Supporting Actor", "Best Supporting Actress"]
    venues = ["BAFTA", "Golden Globes", "Critics Choice", "SAG", "PGA", "DGA"]
    
    import random
    for category in categories:
        # Generate weights for each venue
        total_weight = 0
        weights = {}
        
        for venue in venues:
            # Skip irrelevant awards
            if venue == "SAG" and "Actor" not in category and "Actress" not in category:
                continue
            if venue == "DGA" and category != "Best Director":
                continue
            if venue == "PGA" and category != "Best Picture":
                continue
            
            # Generate random weight
            weight = random.uniform(0.1, 1.0)
            weights[venue] = weight
            total_weight += weight
        
        # Normalize weights
        for venue, weight in weights.items():
            normalized_weight = weight / total_weight
            accuracy = random.uniform(70, 95)  # Random accuracy percentage
            
            # Add to database
            model_weight = ModelWeight(
                year=2025,
                category=category,
                award_venue=venue,
                weight=normalized_weight,
                accuracy=accuracy
            )
            session.add(model_weight)
    
    session.commit()
    print("Sample model weights added to database.")


def init_database(reset=False):
    """Initialize the database with tables and sample data."""
    try:
        # Create tables
        create_tables()
        
        # Add sample data
        with get_session() as session:
            # Add sample nominations
            add_sample_nominations(session)
            
            # Add sample model weights
            add_sample_model_weights(session)
        
        print("Sample data added to database.")
    except Exception as e:
        print(f"Error initializing database: {e}")
        return False
    
    return True


def main():
    """Initialize the database."""
    parser = argparse.ArgumentParser(description="Initialize the Oscar Predictor database")
    parser.add_argument("--reset", action="store_true", help="Reset the database (drop all tables)")
    args = parser.parse_args()
    
    if args.reset:
        print("Resetting database...")
        # We would implement database reset logic here
        # For example, drop_tables()
        
    success = init_database(reset=args.reset)
    
    if success:
        print("Database initialization complete!")
        return 0
    else:
        print("Database initialization failed!")
        return 1


if __name__ == "__main__":
    sys.exit(main())