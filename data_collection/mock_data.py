import pandas as pd
import numpy as np
from typing import List, Dict, Any, Optional, Tuple
from datetime import datetime
from utils.constants import OSCAR_CATEGORIES, AWARD_VENUES, NOMINATION_TYPES

def generate_mock_historical_data(recent_years: Optional[int] = None) -> pd.DataFrame:
    """
    Generate mock historical Oscar data.
    
    Args:
        recent_years: If provided, only generate data for the last N years
        
    Returns:
        DataFrame with mock historical Oscar data
    """
    current_year = datetime.now().year
    start_year = current_year - (recent_years if recent_years else 20)
    
    data = []
    
    for year in range(start_year, current_year):
        for category in OSCAR_CATEGORIES:
            # Determine the nomination type
            nomination_type = None
            for n_type, categories in NOMINATION_TYPES.items():
                if category in categories:
                    nomination_type = n_type
                    break
            
            if not nomination_type:
                # Default to "Creator" if category not found
                nomination_type = "Creator"
            
            # Generate 5 nominees per category per year
            for i in range(5):
                is_winner = (i == 0)  # First nominee is the winner
                
                # Generate fake nominee and film information
                if "Actor" in category or "Actress" in category:
                    nominee_name = f"Actor {i+1} ({year})"
                    film_title = f"Film {i+1} ({year})"
                elif category == "Best Picture":
                    nominee_name = f"Film {i+1} ({year})"
                    film_title = nominee_name
                else:
                    nominee_name = f"Person {i+1} ({year})"
                    film_title = f"Film {i+1} ({year})"
                
                # Base record
                record = {
                    "year": year,
                    "category": category,
                    "nomination_type": nomination_type,
                    "nominee_name": nominee_name,
                    "film_title": film_title,
                    "won_oscar": is_winner
                }
                
                # Add award wins - usually other awards align with Oscar winners
                for venue in AWARD_VENUES:
                    # 80% chance the Oscar winner also won this award
                    # 20% chance a non-winner won this award
                    if is_winner:
                        won_at_venue = np.random.random() < 0.8
                    else:
                        won_at_venue = np.random.random() < 0.2
                    
                    record[f"{venue}_won"] = won_at_venue
                
                # Add audience and critics scores
                if is_winner:
                    record["critics_score"] = np.random.uniform(80, 95)
                    record["audience_score"] = np.random.uniform(75, 95)
                else:
                    record["critics_score"] = np.random.uniform(65, 85)
                    record["audience_score"] = np.random.uniform(60, 90)
                
                data.append(record)
    
    return pd.DataFrame(data)

def generate_mock_nominees_data(year: int) -> pd.DataFrame:
    """
    Generate mock Oscar nominees data for the current year.
    
    Args:
        year: The Oscar year to generate nominees for
        
    Returns:
        DataFrame with mock nominees data
    """
    data = []
    
    # Real 2024/2025 nominees to make the data more realistic
    nominees = {
        "Best Picture": [
            {"name": "Oppenheimer", "film": "Oppenheimer", "critics": 93, "audience": 91},
            {"name": "Poor Things", "film": "Poor Things", "critics": 92, "audience": 80},
            {"name": "Killers of the Flower Moon", "film": "Killers of the Flower Moon", "critics": 92, "audience": 87},
            {"name": "The Zone of Interest", "film": "The Zone of Interest", "critics": 93, "audience": 80},
            {"name": "American Fiction", "film": "American Fiction", "critics": 90, "audience": 92},
            {"name": "Barbie", "film": "Barbie", "critics": 88, "audience": 83},
            {"name": "Maestro", "film": "Maestro", "critics": 80, "audience": 78},
            {"name": "Past Lives", "film": "Past Lives", "critics": 96, "audience": 85},
            {"name": "Anatomy of a Fall", "film": "Anatomy of a Fall", "critics": 96, "audience": 85},
            {"name": "The Holdovers", "film": "The Holdovers", "critics": 96, "audience": 89}
        ],
        "Directing": [
            {"name": "Christopher Nolan", "film": "Oppenheimer", "critics": 93, "audience": 91},
            {"name": "Martin Scorsese", "film": "Killers of the Flower Moon", "critics": 92, "audience": 87},
            {"name": "Yorgos Lanthimos", "film": "Poor Things", "critics": 92, "audience": 80},
            {"name": "Jonathan Glazer", "film": "The Zone of Interest", "critics": 93, "audience": 80},
            {"name": "Justine Triet", "film": "Anatomy of a Fall", "critics": 96, "audience": 85}
        ],
        "Actor in a Leading Role": [
            {"name": "Cillian Murphy", "film": "Oppenheimer", "critics": 93, "audience": 91},
            {"name": "Bradley Cooper", "film": "Maestro", "critics": 80, "audience": 78},
            {"name": "Colman Domingo", "film": "Rustin", "critics": 85, "audience": 72},
            {"name": "Paul Giamatti", "film": "The Holdovers", "critics": 96, "audience": 89},
            {"name": "Jeffrey Wright", "film": "American Fiction", "critics": 90, "audience": 92}
        ],
        "Actress in a Leading Role": [
            {"name": "Lily Gladstone", "film": "Killers of the Flower Moon", "critics": 92, "audience": 87},
            {"name": "Emma Stone", "film": "Poor Things", "critics": 92, "audience": 80},
            {"name": "Sandra Hüller", "film": "Anatomy of a Fall", "critics": 96, "audience": 85},
            {"name": "Carey Mulligan", "film": "Maestro", "critics": 80, "audience": 78},
            {"name": "Annette Bening", "film": "Nyad", "critics": 77, "audience": 92}
        ],
        "Actor in a Supporting Role": [
            {"name": "Robert Downey Jr.", "film": "Oppenheimer", "critics": 93, "audience": 91},
            {"name": "Ryan Gosling", "film": "Barbie", "critics": 88, "audience": 83},
            {"name": "Mark Ruffalo", "film": "Poor Things", "critics": 92, "audience": 80},
            {"name": "Robert De Niro", "film": "Killers of the Flower Moon", "critics": 92, "audience": 87},
            {"name": "Sterling K. Brown", "film": "American Fiction", "critics": 90, "audience": 92}
        ],
        "Actress in a Supporting Role": [
            {"name": "Da'Vine Joy Randolph", "film": "The Holdovers", "critics": 96, "audience": 89},
            {"name": "Emily Blunt", "film": "Oppenheimer", "critics": 93, "audience": 91},
            {"name": "Danielle Brooks", "film": "The Color Purple", "critics": 87, "audience": 94},
            {"name": "America Ferrera", "film": "Barbie", "critics": 88, "audience": 83},
            {"name": "Jodie Foster", "film": "Nyad", "critics": 77, "audience": 92}
        ]
    }
    
    # Add other categories with generic nominees
    for category in OSCAR_CATEGORIES:
        if category in nominees:
            category_nominees = nominees[category]
        else:
            # Generate generic nominees for other categories
            category_nominees = [
                {"name": f"Nominee {i+1} for {category}", "film": f"Film {i+1}", 
                 "critics": np.random.uniform(75, 95), "audience": np.random.uniform(70, 95)} 
                for i in range(5)
            ]
        
        # Determine the nomination type
        nomination_type = None
        for n_type, categories in NOMINATION_TYPES.items():
            if category in categories:
                nomination_type = n_type
                break
        
        if not nomination_type:
            # Default to "Creator" if category not found
            nomination_type = "Creator"
        
        for nominee in category_nominees:
            record = {
                "year": year,
                "category": category,
                "nomination_type": nomination_type,
                "nominee_name": nominee["name"],
                "film_title": nominee["film"],
                "critics_score": nominee["critics"],
                "audience_score": nominee["audience"]
            }
            data.append(record)
    
    return pd.DataFrame(data)

def generate_mock_awards_data(year: int) -> pd.DataFrame:
    """
    Generate mock awards data from other venues.
    
    Args:
        year: The year to generate awards data for
        
    Returns:
        DataFrame with mock awards data
    """
    data = []
    
    # Real winners from award venues for 2024 films
    award_winners = {
        "BAFTA": {
            "Best Film": "Oppenheimer",
            "Best Director": "Christopher Nolan",
            "Best Actor": "Cillian Murphy",
            "Best Actress": "Emma Stone",
            "Best Supporting Actor": "Robert Downey Jr.",
            "Best Supporting Actress": "Da'Vine Joy Randolph"
        },
        "Golden Globes": {
            "Best Motion Picture - Drama": "Oppenheimer",
            "Best Director": "Christopher Nolan",
            "Best Actor - Drama": "Cillian Murphy",
            "Best Actress - Drama": "Lily Gladstone",
            "Best Actor - Musical or Comedy": "Paul Giamatti",
            "Best Actress - Musical or Comedy": "Emma Stone",
            "Best Supporting Actor": "Robert Downey Jr.",
            "Best Supporting Actress": "Da'Vine Joy Randolph"
        },
        "SAG": {
            "Outstanding Performance by a Cast": "Oppenheimer",
            "Outstanding Performance by a Male Actor in a Leading Role": "Cillian Murphy",
            "Outstanding Performance by a Female Actor in a Leading Role": "Lily Gladstone",
            "Outstanding Performance by a Male Actor in a Supporting Role": "Robert Downey Jr.",
            "Outstanding Performance by a Female Actor in a Supporting Role": "Da'Vine Joy Randolph"
        },
        "Critics Choice": {
            "Best Picture": "Oppenheimer",
            "Best Director": "Christopher Nolan",
            "Best Actor": "Paul Giamatti",
            "Best Actress": "Emma Stone",
            "Best Supporting Actor": "Robert Downey Jr.",
            "Best Supporting Actress": "Da'Vine Joy Randolph"
        },
        "PGA": {
            "Best Theatrical Motion Picture": "Oppenheimer"
        },
        "DGA": {
            "Outstanding Directorial Achievement": "Christopher Nolan"
        },
        "WGA": {
            "Best Original Screenplay": "Anatomy of a Fall",
            "Best Adapted Screenplay": "American Fiction"
        }
    }
    
    # Map award venue categories to Oscar categories
    venue_to_oscar = {
        "BAFTA": {
            "Best Film": "Best Picture",
            "Best Director": "Directing",
            "Best Actor": "Actor in a Leading Role",
            "Best Actress": "Actress in a Leading Role",
            "Best Supporting Actor": "Actor in a Supporting Role",
            "Best Supporting Actress": "Actress in a Supporting Role"
        },
        "Golden Globes": {
            "Best Motion Picture - Drama": "Best Picture",
            "Best Director": "Directing",
            "Best Actor - Drama": "Actor in a Leading Role",
            "Best Actress - Drama": "Actress in a Leading Role",
            "Best Actor - Musical or Comedy": "Actor in a Leading Role",
            "Best Actress - Musical or Comedy": "Actress in a Leading Role",
            "Best Supporting Actor": "Actor in a Supporting Role",
            "Best Supporting Actress": "Actress in a Supporting Role"
        },
        "SAG": {
            "Outstanding Performance by a Cast": "Best Picture",
            "Outstanding Performance by a Male Actor in a Leading Role": "Actor in a Leading Role",
            "Outstanding Performance by a Female Actor in a Leading Role": "Actress in a Leading Role",
            "Outstanding Performance by a Male Actor in a Supporting Role": "Actor in a Supporting Role",
            "Outstanding Performance by a Female Actor in a Supporting Role": "Actress in a Supporting Role"
        },
        "Critics Choice": {
            "Best Picture": "Best Picture",
            "Best Director": "Directing",
            "Best Actor": "Actor in a Leading Role",
            "Best Actress": "Actress in a Leading Role",
            "Best Supporting Actor": "Actor in a Supporting Role",
            "Best Supporting Actress": "Actress in a Supporting Role"
        },
        "PGA": {
            "Best Theatrical Motion Picture": "Best Picture"
        },
        "DGA": {
            "Outstanding Directorial Achievement": "Directing"
        },
        "WGA": {
            "Best Original Screenplay": "Writing (Original Screenplay)",
            "Best Adapted Screenplay": "Writing (Adapted Screenplay)"
        }
    }
    
    # Generate data for each venue
    for venue, categories in award_winners.items():
        for venue_category, winner in categories.items():
            if venue in venue_to_oscar and venue_category in venue_to_oscar[venue]:
                oscar_category = venue_to_oscar[venue][venue_category]
                
                record = {
                    "year": year,
                    "award_venue": venue,
                    "award_category": venue_category,
                    "oscar_category": oscar_category,
                    "winner_name": winner
                }
                data.append(record)
    
    # Add some random awards for other categories
    for category in OSCAR_CATEGORIES:
        if category not in [r["oscar_category"] for r in data]:
            # Add random awards for this category
            for venue in AWARD_VENUES:
                if np.random.random() < 0.3:  # 30% chance to add an award for this venue
                    record = {
                        "year": year,
                        "award_venue": venue,
                        "award_category": f"{venue} equivalent of {category}",
                        "oscar_category": category,
                        "winner_name": f"Random Winner for {category} ({venue})"
                    }
                    data.append(record)
    
    return pd.DataFrame(data)