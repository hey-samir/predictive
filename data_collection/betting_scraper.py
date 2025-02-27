import requests
from bs4 import BeautifulSoup
import pandas as pd
import time
import random
import json
import re
from datetime import datetime
from typing import Dict, List, Optional, Union

def get_user_agent() -> str:
    """Return a random user agent to avoid scraping detection."""
    user_agents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:90.0) Gecko/20100101 Firefox/90.0',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 11.5; rv:90.0) Gecko/20100101 Firefox/90.0',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_5_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Safari/605.1.15'
    ]
    return random.choice(user_agents)

def make_request(url: str) -> Optional[str]:
    """Make an HTTP request with error handling and retries."""
    headers = {'User-Agent': get_user_agent()}
    max_retries = 3
    retry_count = 0
    
    while retry_count < max_retries:
        try:
            response = requests.get(url, headers=headers, timeout=10)
            response.raise_for_status()
            return response.text
        except requests.exceptions.RequestException as e:
            print(f"Request error: {e}")
            retry_count += 1
            if retry_count < max_retries:
                wait_time = 2 ** retry_count  # Exponential backoff
                print(f"Retrying in {wait_time} seconds...")
                time.sleep(wait_time)
            else:
                print("Max retries reached. Giving up.")
                return None
        except Exception as e:
            print(f"Unexpected error: {e}")
            return None

def get_betting_odds(year: int) -> pd.DataFrame:
    """
    Scrape betting odds data for Oscar nominees.
    
    Args:
        year: The Oscar year to retrieve betting odds for
        
    Returns:
        DataFrame with betting odds data
    """
    print(f"Fetching betting odds for Oscar {year}...")
    
    # This function would normally scrape from betting sites
    # For the sake of this exercise, we'll generate simulated data
    
    # Define the categories we're interested in
    from utils.constants import OSCAR_CATEGORIES
    
    data = []
    
    # Simulate getting betting odds for each category
    for category in OSCAR_CATEGORIES:
        # Get nominees for this category (in a real implementation)
        # For now, we'll create placeholder data
        
        # Generate between 3-10 nominees per category
        num_nominees = random.randint(3, 10)
        nominees = [f"Nominee {i+1}" for i in range(num_nominees)]
        
        # Distribute probabilities - they should sum close to 100%
        remaining_probability = 100.0
        odds_list = []
        
        for i in range(len(nominees) - 1):
            # For all but the last nominee, assign a random portion of remaining probability
            if i == 0:
                # Make the first nominee more likely to win (higher odds)
                odds = random.uniform(remaining_probability * 0.3, remaining_probability * 0.7)
            else:
                odds = random.uniform(0, remaining_probability * 0.5)
                
            odds_list.append(round(odds, 1))
            remaining_probability -= odds_list[-1]
        
        # Last nominee gets remaining probability
        odds_list.append(round(remaining_probability, 1))
        
        # Add to data
        for nominee, odds in zip(nominees, odds_list):
            data.append({
                "year": year,
                "category": category,
                "nominee": nominee,
                "betting_odds_percent": odds
            })
    
    # Convert to DataFrame
    if data:
        return pd.DataFrame(data)
    else:
        # Return empty DataFrame with expected columns
        return pd.DataFrame(columns=[
            'year', 'category', 'nominee', 'betting_odds_percent'
        ])

def get_predictive_markets(year: int) -> pd.DataFrame:
    """
    Scrape predictive markets data for Oscar nominees.
    
    Args:
        year: The Oscar year to retrieve predictive markets data for
        
    Returns:
        DataFrame with predictive markets data
    """
    print(f"Fetching predictive markets data for Oscar {year}...")
    
    # This function would normally scrape from predictive market sites
    # For the sake of this exercise, we'll generate simulated data
    
    # Define the categories we're interested in
    from utils.constants import OSCAR_CATEGORIES
    
    data = []
    
    # Simulate getting predictive markets data for each category
    for category in OSCAR_CATEGORIES:
        # Get nominees for this category (in a real implementation)
        # For now, we'll create placeholder data
        
        # Generate between 3-10 nominees per category
        num_nominees = random.randint(3, 10)
        nominees = [f"Nominee {i+1}" for i in range(num_nominees)]
        
        # Distribute probabilities - they should sum close to 100%
        remaining_probability = 100.0
        odds_list = []
        
        for i in range(len(nominees) - 1):
            # For all but the last nominee, assign a random portion of remaining probability
            if i == 0:
                # Make the first nominee more likely to win (higher odds)
                odds = random.uniform(remaining_probability * 0.3, remaining_probability * 0.7)
            else:
                odds = random.uniform(0, remaining_probability * 0.5)
                
            odds_list.append(round(odds, 1))
            remaining_probability -= odds_list[-1]
        
        # Last nominee gets remaining probability
        odds_list.append(round(remaining_probability, 1))
        
        # Add to data
        for nominee, odds in zip(nominees, odds_list):
            data.append({
                "year": year,
                "category": category,
                "nominee": nominee,
                "predictive_market_percent": odds
            })
    
    # Convert to DataFrame
    if data:
        return pd.DataFrame(data)
    else:
        # Return empty DataFrame with expected columns
        return pd.DataFrame(columns=[
            'year', 'category', 'nominee', 'predictive_market_percent'
        ])

def convert_betting_odds_to_probability(fractional_odds: str) -> float:
    """
    Convert fractional betting odds to probability percentage.
    
    Args:
        fractional_odds: String in format like "5/2" or "1/3"
        
    Returns:
        Probability as percentage (0-100)
    """
    try:
        if '/' in fractional_odds:
            numerator, denominator = map(int, fractional_odds.split('/'))
            probability = denominator / (numerator + denominator) * 100
        elif '-' in fractional_odds and fractional_odds.startswith('-'):
            # American odds (negative)
            odds = int(fractional_odds[1:])
            probability = odds / (odds + 100) * 100
        elif '+' in fractional_odds:
            # American odds (positive)
            odds = int(fractional_odds[1:])
            probability = 100 / (odds + 100) * 100
        else:
            # Decimal odds
            decimal = float(fractional_odds)
            probability = 100 / decimal
        
        return round(probability, 1)
    except Exception:
        return 0.0
