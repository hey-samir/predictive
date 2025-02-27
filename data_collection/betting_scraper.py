import requests
import random
import pandas as pd
from typing import List, Dict, Any, Optional, Tuple
from utils.constants import OSCAR_CATEGORIES

def get_user_agent() -> str:
    """Return a random user agent to avoid scraping detection."""
    user_agents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Safari/605.1.15',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:90.0) Gecko/20100101 Firefox/90.0'
    ]
    return random.choice(user_agents)

def make_request(url: str) -> Optional[str]:
    """Make an HTTP request with error handling and retries."""
    headers = {
        'User-Agent': get_user_agent(),
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept': 'text/html,application/xhtml+xml,application/xml',
        'Referer': 'https://www.google.com/'
    }
    
    try:
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        return response.text
    except requests.exceptions.RequestException:
        # In a real application, we would implement retries and better error handling
        return None

def get_betting_odds(year: int) -> pd.DataFrame:
    """
    Scrape betting odds data for Oscar nominees.
    
    Args:
        year: The Oscar year to retrieve betting odds for
        
    Returns:
        DataFrame with betting odds data
    """
    # In a real application, this would scrape betting odds from various bookmakers
    # For this example, we'll generate mock data
    
    # Get nominees to ensure we use real nominee names
    from data_collection.mock_data import generate_mock_nominees_data
    nominees_data = generate_mock_nominees_data(year)
    
    data = []
    
    # Generate odds for each category
    for category in OSCAR_CATEGORIES:
        category_nominees = nominees_data[nominees_data['category'] == category]
        
        if len(category_nominees) == 0:
            continue
        
        # Assign betting odds based on real odds distributions
        total_nominees = len(category_nominees)
        for i, (_, nominee) in enumerate(category_nominees.iterrows()):
            # Favorites have higher odds, underdogs have lower odds
            if i == 0:  # Favorite
                probability = random.uniform(50, 85)
            elif i == 1:  # Second favorite
                probability = random.uniform(30, 50)
            elif i == 2:  # Third favorite
                probability = random.uniform(10, 30)
            else:  # Underdog
                probability = random.uniform(1, 10)
            
            # Some random variation
            adjusted_probability = min(95, max(1, probability * random.uniform(0.9, 1.1)))
            
            data.append({
                'category': category,
                'nominee': nominee['nominee_name'],
                'film_title': nominee.get('film_title', ''),
                'probability': adjusted_probability,
                'fractional_odds': convert_probability_to_odds(adjusted_probability)
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
    # In a real application, this would scrape predictive markets data
    # For this example, we'll generate mock data that's similar to betting odds
    # but with some variation
    
    # Get betting odds as a base
    betting_odds = get_betting_odds(year)
    
    data = []
    
    # Generate predictive markets data with some variation from betting odds
    for _, odds in betting_odds.iterrows():
        # Predictive markets tend to be more accurate than betting odds in some cases
        # So we'll add some random variation
        variation = random.uniform(-10, 10)
        probability = min(95, max(1, odds['probability'] + variation))
        
        data.append({
            'category': odds['category'],
            'nominee': odds['nominee'],
            'film_title': odds.get('film_title', ''),
            'probability': probability
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
    # Convert probability to decimal odds
    if probability <= 0 or probability >= 100:
        return "1/1"  # Even odds for impossible cases
    
    decimal_odds = 100 / probability
    
    # Convert decimal to fractional
    # This is a simplified conversion for common fractional odds
    if decimal_odds <= 1.5:
        return "1/2"  # Heavy favorite
    elif decimal_odds <= 2.0:
        return "1/1"  # Even odds
    elif decimal_odds <= 2.5:
        return "6/4"
    elif decimal_odds <= 3.0:
        return "2/1"
    elif decimal_odds <= 4.0:
        return "3/1"
    elif decimal_odds <= 5.0:
        return "4/1"
    elif decimal_odds <= 6.0:
        return "5/1"
    elif decimal_odds <= 7.0:
        return "6/1"
    elif decimal_odds <= 9.0:
        return "8/1"
    elif decimal_odds <= 11.0:
        return "10/1"
    elif decimal_odds <= 15.0:
        return "14/1"
    elif decimal_odds <= 21.0:
        return "20/1"
    else:
        return "25/1"  # Longshot

def convert_betting_odds_to_probability(fractional_odds: str) -> float:
    """
    Convert fractional betting odds to probability percentage.
    
    Args:
        fractional_odds: String in format like "5/2" or "1/3"
        
    Returns:
        Probability as percentage (0-100)
    """
    try:
        # Split the fractional odds
        parts = fractional_odds.split('/')
        if len(parts) != 2:
            return 50.0  # Default to 50% if format is invalid
        
        numerator = int(parts[0])
        denominator = int(parts[1])
        
        # Calculate probability
        probability = (denominator / (numerator + denominator)) * 100
        
        return probability
    except (ValueError, ZeroDivisionError):
        return 50.0  # Default to 50% if there's an error