import requests
import random
import pandas as pd
import trafilatura
from typing import List, Dict, Any, Optional, Tuple
from bs4 import BeautifulSoup
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

def get_website_text_content(url: str) -> str:
    """
    This function takes a url and returns the main text content of the website.
    The text content is extracted using trafilatura and easier to understand.
    """
    # Send a request to the website
    downloaded = trafilatura.fetch_url(url)
    text = trafilatura.extract(downloaded)
    return text if text else ""

def get_historical_data(recent_years: Optional[int] = None) -> pd.DataFrame:
    """
    Scrape historical Oscar data from the web.
    
    Args:
        recent_years: If provided, only return data from the last N years
        
    Returns:
        DataFrame with historical Oscar data
    """
    # In a real application, this would scrape data from the Academy's website
    # or other sources like Wikipedia or IMDB
    # For this example, we'll use our mock data generator
    from data_collection.mock_data import generate_mock_historical_data
    return generate_mock_historical_data(recent_years)

def parse_oscar_ceremony_data(content: str, year: int) -> List[Dict]:
    """
    Parse the Oscar ceremony data from the scraped content.
    
    Args:
        content: The scraped content from the Oscar ceremony page
        year: The ceremony year
        
    Returns:
        List of dictionaries with parsed data
    """
    # In a real application, this would parse the HTML content
    # using BeautifulSoup or similar
    # For this example, we'll return an empty list
    return []

def get_nominees_data(year: int) -> pd.DataFrame:
    """
    Scrape current Oscar nominees data.
    
    Args:
        year: The Oscar year to retrieve nominees for
        
    Returns:
        DataFrame with nominees data
    """
    # In a real application, this would scrape data from the Academy's website
    # For this example, we'll use our mock data generator
    from data_collection.mock_data import generate_mock_nominees_data
    return generate_mock_nominees_data(year)

def parse_oscar_nominees_data(content: str, year: int) -> List[Dict]:
    """
    Parse the Oscar nominees data from the scraped content.
    
    Args:
        content: The scraped content from the Oscar nominees page
        year: The ceremony year
        
    Returns:
        List of dictionaries with parsed data
    """
    # In a real application, this would parse the HTML content
    # using BeautifulSoup or similar
    # For this example, we'll return an empty list
    return []

def get_review_scores(film_title: str, year: int) -> Tuple[float, float]:
    """
    Get critics and audience scores for a film.
    
    Args:
        film_title: The title of the film
        year: The release year
        
    Returns:
        Tuple of (critics_score, audience_score)
    """
    # In a real application, this would fetch scores from Rotten Tomatoes,
    # Metacritic, IMDB, etc.
    # For this example, we'll return random scores
    critics_score = random.uniform(60, 95)
    audience_score = random.uniform(60, 95)
    
    return (critics_score, audience_score)