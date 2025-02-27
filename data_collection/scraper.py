import requests
from bs4 import BeautifulSoup
import pandas as pd
import trafilatura
import time
import random
import json
import re
from datetime import datetime
from typing import Dict, List, Optional, Union, Tuple

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

def get_website_text_content(url: str) -> str:
    """
    This function takes a url and returns the main text content of the website.
    The text content is extracted using trafilatura and easier to understand.
    """
    # Add a delay to avoid overloading servers
    time.sleep(random.uniform(1, 3))
    
    # Send a request to the website
    headers = {'User-Agent': get_user_agent()}
    try:
        downloaded = trafilatura.fetch_url(url, headers=headers)
        text = trafilatura.extract(downloaded)
        return text if text else ""
    except Exception as e:
        print(f"Error fetching {url}: {str(e)}")
        return ""

def get_historical_data(recent_years: Optional[int] = None) -> pd.DataFrame:
    """
    Scrape historical Oscar data from the web.
    
    Args:
        recent_years: If provided, only return data from the last N years
        
    Returns:
        DataFrame with historical Oscar data
    """
    # Define the base URL for Oscar history
    base_url = "https://www.oscars.org/oscars/ceremonies/"
    
    # Get the current year
    current_year = datetime.now().year
    
    # Define the range of years to scrape
    if recent_years is not None:
        start_year = current_year - recent_years
    else:
        start_year = 1929  # First Oscar ceremony
    
    all_data = []
    
    # Iterate through the years
    for year in range(start_year, current_year):
        try:
            print(f"Scraping Oscar data for year {year}...")
            
            # Get the ceremony number (different from year)
            ceremony_url = f"{base_url}{year}"
            ceremony_content = get_website_text_content(ceremony_url)
            
            # Parse the content to extract winners and nominees
            year_data = parse_oscar_ceremony_data(ceremony_content, year)
            
            if year_data:
                all_data.extend(year_data)
                
            # Be respectful to the server
            time.sleep(random.uniform(2, 4))
            
        except Exception as e:
            print(f"Error scraping data for year {year}: {str(e)}")
            continue
    
    # Convert to DataFrame
    if all_data:
        df = pd.DataFrame(all_data)
        return df
    else:
        # Return empty DataFrame with expected columns
        return pd.DataFrame(columns=[
            'year', 'category', 'winner_name', 'winner_film', 
            'nominees', 'is_winner'
        ])

def parse_oscar_ceremony_data(content: str, year: int) -> List[Dict]:
    """
    Parse the Oscar ceremony data from the scraped content.
    
    Args:
        content: The scraped content from the Oscar ceremony page
        year: The ceremony year
        
    Returns:
        List of dictionaries with parsed data
    """
    if not content:
        return []
    
    data = []
    
    # Use regex to find category sections
    category_pattern = r"(?:ACTOR|ACTRESS|DIRECTING|PICTURE|CINEMATOGRAPHY|FILM EDITING|WRITING).*?(?=ACTOR|ACTRESS|DIRECTING|PICTURE|CINEMATOGRAPHY|FILM EDITING|WRITING|$)"
    categories = re.findall(category_pattern, content, re.DOTALL | re.IGNORECASE)
    
    for category_text in categories:
        category_lines = category_text.strip().split("\n")
        
        if len(category_lines) < 2:
            continue
        
        # Extract category name
        category = category_lines[0].strip()
        
        # Extract nominees and winner
        nominees = []
        winner_name = ""
        winner_film = ""
        
        for line in category_lines[1:]:
            line = line.strip()
            if not line:
                continue
                
            # Try to extract name and film
            name_film_match = re.match(r"([^,]+)(?:,\s*(.+))?", line)
            if name_film_match:
                name = name_film_match.group(1).strip()
                film = name_film_match.group(2).strip() if name_film_match.group(2) else ""
                
                if not winner_name:
                    winner_name = name
                    winner_film = film
                    
                nominees.append({"name": name, "film": film})
        
        # Add data for each nominee
        for nominee in nominees:
            nominee_data = {
                "year": year,
                "category": category,
                "winner_name": winner_name,
                "winner_film": winner_film,
                "nominee_name": nominee["name"],
                "nominee_film": nominee["film"],
                "is_winner": nominee["name"] == winner_name
            }
            data.append(nominee_data)
    
    return data

def get_nominees_data(year: int) -> pd.DataFrame:
    """
    Scrape current Oscar nominees data.
    
    Args:
        year: The Oscar year to retrieve nominees for
        
    Returns:
        DataFrame with nominees data
    """
    # Define the URL for nominees
    nominees_url = f"https://www.oscars.org/oscars/ceremonies/{year}"
    
    try:
        # Get the content
        content = get_website_text_content(nominees_url)
        
        # Parse the nominees data
        nominees_data = parse_oscar_nominees_data(content, year)
        
        if nominees_data:
            return pd.DataFrame(nominees_data)
        else:
            # Return empty DataFrame with expected columns
            return pd.DataFrame(columns=[
                'year', 'category', 'nominee_name', 'nominee_film'
            ])
            
    except Exception as e:
        print(f"Error scraping nominees for year {year}: {str(e)}")
        # Return empty DataFrame with expected columns
        return pd.DataFrame(columns=[
            'year', 'category', 'nominee_name', 'nominee_film'
        ])

def parse_oscar_nominees_data(content: str, year: int) -> List[Dict]:
    """
    Parse the Oscar nominees data from the scraped content.
    
    Args:
        content: The scraped content from the Oscar nominees page
        year: The ceremony year
        
    Returns:
        List of dictionaries with parsed data
    """
    if not content:
        return []
    
    data = []
    
    # Use regex to find category sections
    category_pattern = r"(?:ACTOR|ACTRESS|DIRECTING|PICTURE|CINEMATOGRAPHY|FILM EDITING|WRITING).*?(?=ACTOR|ACTRESS|DIRECTING|PICTURE|CINEMATOGRAPHY|FILM EDITING|WRITING|$)"
    categories = re.findall(category_pattern, content, re.DOTALL | re.IGNORECASE)
    
    for category_text in categories:
        category_lines = category_text.strip().split("\n")
        
        if len(category_lines) < 2:
            continue
        
        # Extract category name
        category = category_lines[0].strip()
        
        # Extract nominees
        for line in category_lines[1:]:
            line = line.strip()
            if not line:
                continue
                
            # Try to extract name and film
            name_film_match = re.match(r"([^,]+)(?:,\s*(.+))?", line)
            if name_film_match:
                name = name_film_match.group(1).strip()
                film = name_film_match.group(2).strip() if name_film_match.group(2) else ""
                
                nominee_data = {
                    "year": year,
                    "category": category,
                    "nominee_name": name,
                    "nominee_film": film
                }
                data.append(nominee_data)
    
    return data

# Function to get critic and audience scores
def get_review_scores(film_title: str, year: int) -> Tuple[float, float]:
    """
    Get critics and audience scores for a film.
    
    Args:
        film_title: The title of the film
        year: The release year
        
    Returns:
        Tuple of (critics_score, audience_score)
    """
    # Simulate getting review scores
    # In a real implementation, would scrape from Rotten Tomatoes, Metacritic, etc.
    
    # Generate some random scores for demonstration purposes
    critics_score = random.uniform(60, 95)
    audience_score = random.uniform(50, 90)
    
    return (critics_score, audience_score)
