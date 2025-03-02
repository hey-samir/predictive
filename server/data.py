"""
Consolidated data processing module for the Oscar Predictor application.
This module combines functionality from:
- data_collection/scraper.py
- data_collection/award_data.py
- data_collection/betting_scraper.py
- data_collection/mock_data.py
- data_processing/data_processor.py
"""

import random
import time
from typing import Dict, List, Optional, Tuple, Any
from datetime import datetime

import pandas as pd
import requests
from bs4 import BeautifulSoup

from server.constants import AWARD_VENUES, OSCAR_CATEGORIES

#-----------------------------------------------------------------------------
# Web Scraping Utilities
#-----------------------------------------------------------------------------

def get_user_agent() -> str:
    """Return a random user agent to avoid scraping detection."""
    user_agents = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15",
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:90.0) Gecko/20100101 Firefox/90.0",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:90.0) Gecko/20100101 Firefox/90.0"
    ]
    return random.choice(user_agents)


def make_request(url: str) -> Optional[str]:
    """Make an HTTP request with error handling and retries."""
    headers = {"User-Agent": get_user_agent()}
    max_retries = 3
    retry_delay = 1
    
    for attempt in range(max_retries):
        try:
            response = requests.get(url, headers=headers, timeout=10)
            response.raise_for_status()
            return response.text
        except (requests.RequestException, ValueError) as e:
            print(f"Request error (attempt {attempt+1}/{max_retries}): {e}")
            if attempt < max_retries - 1:
                time.sleep(retry_delay)
                retry_delay *= 2  # Exponential backoff
    
    return None


#-----------------------------------------------------------------------------
# Historical Data Collection
#-----------------------------------------------------------------------------

def get_historical_data(recent_years: Optional[int] = None) -> pd.DataFrame:
    """
    Scrape historical Oscar data from the web.
    
    Args:
        recent_years: If provided, only return data from the last N years
        
    Returns:
        DataFrame with historical Oscar data
    """
    # In a real application, this would scrape from IMDb, Wikipedia, etc.
    # For now, use mock data as a placeholder
    df = generate_mock_historical_data(recent_years)
    return df


def generate_mock_historical_data(recent_years: Optional[int] = None) -> pd.DataFrame:
    """
    Generate mock historical Oscar data.
    
    Args:
        recent_years: If provided, only generate data for the last N years
        
    Returns:
        DataFrame with mock historical Oscar data
    """
    # Define the year range
    current_year = datetime.now().year
    start_year = current_year - (recent_years or 10)
    years = list(range(start_year, current_year + 1))
    
    # Generate data
    data = []
    
    for year in years:
        for category in OSCAR_CATEGORIES:
            # For simplicity, generate 5 nominees per category
            for i in range(5):
                is_winner = (i == 0)  # First nominee is always the winner
                
                # Create nominee data
                nominee = {
                    "year": year,
                    "category": category,
                    "nominee_name": f"Nominee {i+1} for {category} {year}",
                    "film_title": f"Film {i+1} for {category} {year}",
                    "won_oscar": is_winner,
                    "nomination_type": get_nomination_type(category)
                }
                
                # Add award wins
                for venue in AWARD_VENUES:
                    # Winners have higher chance of winning other awards
                    win_probability = 0.8 if is_winner else 0.2
                    nominee[f"{venue}_won"] = random.random() < win_probability
                
                # Add critic and audience scores
                nominee["critics_score"] = random.uniform(60, 95) if is_winner else random.uniform(40, 85)
                nominee["audience_score"] = random.uniform(70, 90) if is_winner else random.uniform(50, 85)
                
                data.append(nominee)
    
    return pd.DataFrame(data)


def get_nomination_type(category: str) -> str:
    """Get the nomination type based on the category."""
    performance_categories = ["Actor", "Actress"]
    creator_categories = ["Director", "Screenplay", "Writing"]
    crafter_categories = ["Cinematography", "Editing", "Design", "Sound", "Makeup", "Costume"]
    
    if any(term in category for term in performance_categories):
        return "Performer"
    elif any(term in category for term in creator_categories):
        return "Creator"
    elif any(term in category for term in crafter_categories):
        return "Crafter"
    else:
        return "Maker"  # Default for categories like Best Picture


#-----------------------------------------------------------------------------
# Current Nominees Data Collection
#-----------------------------------------------------------------------------

def get_current_nominees(year: int) -> pd.DataFrame:
    """
    Get current year's Oscar nominees.
    
    Args:
        year: The Oscar year
        
    Returns:
        DataFrame with current nominees
    """
    # In a real application, this would scrape from the official Oscar website
    # For now, use mock data as a placeholder
    df = generate_mock_nominees_data(year)
    return df


def generate_mock_nominees_data(year: int) -> pd.DataFrame:
    """
    Generate mock Oscar nominees data for the current year.
    
    Args:
        year: The Oscar year to generate nominees for
        
    Returns:
        DataFrame with mock nominees data
    """
    # Define some realistic nominees for 2025
    nominees_data = {
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
    
    data = []
    for category, nominees in nominees_data.items():
        for nominee in nominees:
            data.append({
                "year": year,
                "category": category,
                "nominee_name": nominee["name"],
                "film_title": nominee.get("film", nominee["name"]),
                "won_oscar": nominee["won"],
                "nomination_type": get_nomination_type(category)
            })
    
    return pd.DataFrame(data)


#-----------------------------------------------------------------------------
# Award Data Collection
#-----------------------------------------------------------------------------

def get_awards_data(year: int) -> pd.DataFrame:
    """
    Scrape data from various award shows for the given year.
    
    Args:
        year: The year to retrieve award show data for
        
    Returns:
        DataFrame with award show data
    """
    # In a real application, this would scrape from various award websites
    # For now, use mock data as a placeholder
    df = generate_mock_awards_data(year)
    return df


def generate_mock_awards_data(year: int) -> pd.DataFrame:
    """
    Generate mock awards data from other venues.
    
    Args:
        year: The year to generate awards data for
        
    Returns:
        DataFrame with mock awards data
    """
    # Get nominees for reference
    nominees_df = get_current_nominees(year)
    
    # Create mock awards data
    data = []
    
    for _, nominee in nominees_df.iterrows():
        for venue in AWARD_VENUES:
            # Skip irrelevant awards (e.g., SAG for non-acting categories)
            if venue == "SAG" and nominee["nomination_type"] != "Performer":
                continue
            if venue == "DGA" and nominee["category"] != "Best Director":
                continue
            if venue == "PGA" and nominee["category"] != "Best Picture":
                continue
            
            # Map Oscar category to award venue category
            award_category = map_award_category_to_oscar(venue, nominee["category"])
            if not award_category:
                continue
            
            # Winners have higher chance of winning other awards
            win_probability = 0.8 if nominee["won_oscar"] else 0.2
            won = random.random() < win_probability
            
            data.append({
                "award_venue": venue,
                "award_category": award_category,
                "nominee_name": nominee["nominee_name"],
                "film_title": nominee["film_title"],
                "won": won,
                "year": year,
                "oscar_category": nominee["category"]
            })
    
    return pd.DataFrame(data)


def map_award_category_to_oscar(award_venue: str, category: str) -> Optional[str]:
    """
    Map a category from a specific award venue to the corresponding Oscar category.
    
    Args:
        award_venue: The name of the award venue (e.g., "BAFTA", "Golden Globes")
        category: The category name in the award venue
        
    Returns:
        The corresponding Oscar category, or None if no mapping exists
    """
    # In a real application, this would have a comprehensive mapping
    # For simplicity, use the same category names
    return category


#-----------------------------------------------------------------------------
# Betting Data Collection
#-----------------------------------------------------------------------------

def get_betting_odds(year: int) -> pd.DataFrame:
    """
    Scrape betting odds data for Oscar nominees.
    
    Args:
        year: The Oscar year to retrieve betting odds for
        
    Returns:
        DataFrame with betting odds data
    """
    # In a real application, this would scrape from betting websites
    # For now, use mock data as a placeholder
    
    # Get nominees for reference
    nominees_df = get_current_nominees(year)
    
    # Create mock betting odds data
    data = []
    
    for _, nominee in nominees_df.iterrows():
        # Winners have lower odds (more likely to win)
        if nominee["won_oscar"]:
            odds_value = random.uniform(1.1, 2.0)
        else:
            odds_value = random.uniform(3.0, 10.0)
        
        # Convert to fractional odds string
        fractional_odds = convert_probability_to_odds(100 / odds_value)
        
        data.append({
            "category": nominee["category"],
            "nominee_name": nominee["nominee_name"],
            "film_title": nominee["film_title"],
            "betting_odds": fractional_odds,
            "odds_value": odds_value,
            "year": year
        })
    
    return pd.DataFrame(data)


def get_predictive_markets(year: int) -> pd.DataFrame:
    """
    Scrape predictive markets data for Oscar nominees.
    
    Args:
        year: The Oscar year to retrieve predictive markets data for
        
    Returns:
        DataFrame with predictive markets data
    """
    # In a real application, this would scrape from predictive markets websites
    # For now, use mock data as a placeholder
    
    # Get nominees for reference
    nominees_df = get_current_nominees(year)
    
    # Create mock predictive markets data
    data = []
    
    for _, nominee in nominees_df.iterrows():
        # Winners have higher probability
        if nominee["won_oscar"]:
            probability = random.uniform(70, 90)
        else:
            probability = random.uniform(10, 40)
        
        data.append({
            "category": nominee["category"],
            "nominee_name": nominee["nominee_name"],
            "film_title": nominee["film_title"],
            "probability": probability,
            "year": year
        })
    
    return pd.DataFrame(data)


def convert_probability_to_odds(probability: float) -> str:
    """
    Convert probability percentage to fractional betting odds.
    
    Args:
        probability: Probability as percentage (0-100)
        
    Returns:
        Fractional odds as string (e.g., "5/2")
    """
    # Calculate fractional odds
    if probability >= 50:
        numerator = probability
        denominator = 100 - probability
    else:
        numerator = 100 - probability
        denominator = probability
    
    # Simplify the fraction
    from math import gcd
    g = gcd(int(numerator), int(denominator))
    numerator = int(numerator) // g
    denominator = int(denominator) // g
    
    return f"{numerator}/{denominator}"


def convert_betting_odds_to_probability(fractional_odds: str) -> float:
    """
    Convert fractional betting odds to probability percentage.
    
    Args:
        fractional_odds: String in format like "5/2" or "1/3"
        
    Returns:
        Probability as percentage (0-100)
    """
    try:
        parts = fractional_odds.split("/")
        numerator = int(parts[0])
        denominator = int(parts[1])
        
        # Calculate implied probability
        probability = (denominator / (numerator + denominator)) * 100
        return probability
    except (ValueError, IndexError, ZeroDivisionError):
        return 0.0


#-----------------------------------------------------------------------------
# Data Processing
#-----------------------------------------------------------------------------

def process_historical_data(data: pd.DataFrame, include_critics: bool = True, include_audience: bool = True) -> pd.DataFrame:
    """
    Process historical data to prepare for modeling.
    
    Args:
        data: DataFrame with historical Oscar data
        include_critics: Whether to include critics scores
        include_audience: Whether to include audience scores
        
    Returns:
        Processed DataFrame ready for modeling
    """
    # Ensure all required columns are present
    for venue in AWARD_VENUES:
        if f"{venue}_won" not in data.columns:
            data[f"{venue}_won"] = False
    
    # Add critic and audience score columns if missing
    if "critics_score" not in data.columns:
        data["critics_score"] = 0.0
    if "audience_score" not in data.columns:
        data["audience_score"] = 0.0
    
    # Filter columns based on parameters
    columns_to_keep = ["year", "category", "nominee_name", "film_title", "won_oscar", "nomination_type"]
    columns_to_keep.extend([f"{venue}_won" for venue in AWARD_VENUES])
    
    if include_critics:
        columns_to_keep.append("critics_score")
    if include_audience:
        columns_to_keep.append("audience_score")
    
    # Keep only the necessary columns
    processed_data = data[columns_to_keep].copy()
    
    return processed_data


def merge_award_data(nominees_data: pd.DataFrame, awards_data: pd.DataFrame) -> pd.DataFrame:
    """
    Merge nominees data with awards data from other venues.
    
    Args:
        nominees_data: DataFrame with Oscar nominees
        awards_data: DataFrame with data from other award venues
        
    Returns:
        Merged DataFrame
    """
    # Create a copy of nominees data
    merged_data = nominees_data.copy()
    
    # Initialize award venue columns
    for venue in AWARD_VENUES:
        merged_data[f"{venue}_won"] = False
    
    # Match awards data to nominees
    for _, award in awards_data.iterrows():
        # Find matching nominee
        mask = (
            (merged_data["nominee_name"] == award["nominee_name"]) &
            (merged_data["category"] == award["oscar_category"])
        )
        
        if any(mask):
            venue = award["award_venue"]
            merged_data.loc[mask, f"{venue}_won"] = award["won"]
    
    return merged_data