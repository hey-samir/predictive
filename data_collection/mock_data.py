import pandas as pd
import numpy as np
import random
from datetime import datetime
from typing import Dict, List, Optional, Union, Tuple

from utils.constants import OSCAR_CATEGORIES

def generate_mock_historical_data(recent_years: Optional[int] = None) -> pd.DataFrame:
    """
    Generate mock historical Oscar data.
    
    Args:
        recent_years: If provided, only generate data for the last N years
        
    Returns:
        DataFrame with mock historical Oscar data
    """
    # Get the current year
    current_year = datetime.now().year
    
    # Define the range of years to generate
    if recent_years is not None:
        start_year = current_year - recent_years
    else:
        start_year = current_year - 20  # Default to 20 years of history
    
    all_data = []
    
    # Generate data for each year
    for year in range(start_year, current_year):
        for category in OSCAR_CATEGORIES:
            # Generate between 3-10 nominees per category
            num_nominees = random.randint(3, 10) if category not in ["Best Picture"] else random.randint(5, 10)
            
            # Decide on a winner
            winner_idx = random.randint(0, num_nominees - 1)
            
            # Generate nominees
            for i in range(num_nominees):
                is_winner = (i == winner_idx)
                
                # For acting categories, separate name and film
                if "Actor" in category or "Actress" in category:
                    nominee_name = f"Actor {i+1} for {year}"
                    nominee_film = f"Film {random.randint(1, 20)} ({year})"
                else:
                    nominee_name = f"Film {random.randint(1, 20)} ({year})"
                    nominee_film = ""
                
                # Winner data
                winner_name = f"Actor {winner_idx+1} for {year}" if ("Actor" in category or "Actress" in category) else f"Film {random.randint(1, 20)} ({year})"
                winner_film = f"Film {random.randint(1, 20)} ({year})" if ("Actor" in category or "Actress" in category) else ""
                
                # Create record
                nominee_data = {
                    "year": year,
                    "category": category,
                    "winner_name": winner_name,
                    "winner_film": winner_film,
                    "nominee_name": nominee_name,
                    "nominee_film": nominee_film,
                    "is_winner": is_winner
                }
                
                # Add award venue results
                for venue in ["BAFTA", "Golden Globes", "Critics Choice", "SAG", "PGA", "DGA"]:
                    # 80% chance winner is same as Oscar winner, 20% it's different
                    if random.random() < 0.8:
                        nominee_data[f"{venue}_won"] = is_winner
                    else:
                        # Randomly decide if this nominee won at this venue
                        nominee_data[f"{venue}_won"] = random.random() < 0.2
                
                # Add critic and audience scores
                nominee_data["critics_score"] = random.uniform(60, 95)
                nominee_data["audience_score"] = random.uniform(50, 90)
                
                all_data.append(nominee_data)
    
    # Convert to DataFrame
    return pd.DataFrame(all_data)

def generate_mock_nominees_data(year: int) -> pd.DataFrame:
    """
    Generate mock Oscar nominees data for the current year.
    
    Args:
        year: The Oscar year to generate nominees for
        
    Returns:
        DataFrame with mock nominees data
    """
    all_data = []
    
    # Generate nominees for each category
    for category in OSCAR_CATEGORIES:
        # Generate between 3-10 nominees per category
        num_nominees = random.randint(3, 10) if category not in ["Best Picture"] else random.randint(5, 10)
        
        # Generate nominees
        for i in range(num_nominees):
            # For acting categories, separate name and film
            if "Actor" in category or "Actress" in category:
                nominee_name = f"Actor {i+1} for {year}"
                nominee_film = f"Film {random.randint(1, 20)} ({year})"
            else:
                nominee_name = f"Film {random.randint(1, 20)} ({year})"
                nominee_film = ""
            
            # Create record
            nominee_data = {
                "year": year,
                "category": category,
                "nominee_name": nominee_name,
                "nominee_film": nominee_film
            }
            
            # Add critic and audience scores
            nominee_data["critics_score"] = random.uniform(60, 95)
            nominee_data["audience_score"] = random.uniform(50, 90)
            
            all_data.append(nominee_data)
    
    # Convert to DataFrame
    return pd.DataFrame(all_data)

def generate_mock_awards_data(year: int) -> pd.DataFrame:
    """
    Generate mock awards data from other venues.
    
    Args:
        year: The year to generate awards data for
        
    Returns:
        DataFrame with mock awards data
    """
    all_data = []
    
    # Define venues and their categories
    venues = {
        "BAFTA": ["Best Film", "Leading Actor", "Leading Actress", "Supporting Actor", "Supporting Actress", "Director"],
        "Golden Globes": ["Best Motion Picture – Drama", "Best Actor – Motion Picture Drama", "Best Actress – Motion Picture Drama"],
        "Critics Choice": ["Best Picture", "Best Actor", "Best Actress", "Best Supporting Actor", "Best Supporting Actress"],
        "SAG": ["Outstanding Performance by a Cast", "Outstanding Performance by a Male Actor", "Outstanding Performance by a Female Actor"],
        "PGA": ["Outstanding Producer of Theatrical Motion Pictures"],
        "DGA": ["Outstanding Directorial Achievement in Motion Pictures"]
    }
    
    # Generate winners for each venue and category
    for venue, categories in venues.items():
        for category in categories:
            # Generate between 3-6 nominees
            num_nominees = random.randint(3, 6)
            
            # Choose a winner
            winner_idx = random.randint(0, num_nominees - 1)
            
            for i in range(num_nominees):
                # Create nominee name
                if "Actor" in category or "Actress" in category or "Performance" in category:
                    nominee = f"Actor {i+1} for {year}"
                else:
                    nominee = f"Film {random.randint(1, 20)} ({year})"
                
                # Add to data
                all_data.append({
                    "year": year,
                    "award_venue": venue,
                    "category": category,
                    "nominee": nominee,
                    "won": (i == winner_idx)
                })
    
    # Convert to DataFrame
    return pd.DataFrame(all_data)