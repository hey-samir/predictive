import requests
from bs4 import BeautifulSoup
import pandas as pd
import time
import random
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

def get_awards_data(year: int) -> pd.DataFrame:
    """
    Scrape data from various award shows for the given year.
    
    Args:
        year: The year to retrieve award show data for
        
    Returns:
        DataFrame with award show data
    """
    # Get data from each award venue
    print(f"Fetching awards data for year {year}...")
    
    # Get venue data
    bafta_data = get_bafta_data(year)
    golden_globes_data = get_golden_globes_data(year)
    critics_choice_data = get_critics_choice_data(year)
    sag_data = get_sag_data(year)
    pga_data = get_pga_data(year)
    dga_data = get_dga_data(year)
    
    # Combine all data
    all_data = pd.concat([
        bafta_data, 
        golden_globes_data, 
        critics_choice_data,
        sag_data,
        pga_data,
        dga_data
    ], ignore_index=True)
    
    return all_data

def get_bafta_data(year: int) -> pd.DataFrame:
    """
    Get BAFTA awards data for the given year.
    
    Args:
        year: The year to retrieve BAFTA data for
        
    Returns:
        DataFrame with BAFTA data
    """
    # In a real implementation, this would scrape the BAFTA website
    # For demonstration, we'll create simulated data
    
    # Define categories that map to Oscar categories
    categories = [
        "Best Film", 
        "Leading Actor", 
        "Leading Actress", 
        "Supporting Actor", 
        "Supporting Actress", 
        "Director", 
        "Original Screenplay", 
        "Adapted Screenplay", 
        "Cinematography", 
        "Film Editing"
    ]
    
    data = []
    
    # Create simulated data for each category
    for category in categories:
        # Create a winner and some nominees
        num_nominees = random.randint(3, 6)
        nominees = [f"{category} Nominee {i+1}" for i in range(num_nominees)]
        winner = random.choice(nominees)
        
        # Add to data
        for nominee in nominees:
            data.append({
                "year": year,
                "award_venue": "BAFTA",
                "category": category,
                "nominee": nominee,
                "won": nominee == winner
            })
    
    # Convert to DataFrame
    return pd.DataFrame(data)

def get_golden_globes_data(year: int) -> pd.DataFrame:
    """
    Get Golden Globes awards data for the given year.
    
    Args:
        year: The year to retrieve Golden Globes data for
        
    Returns:
        DataFrame with Golden Globes data
    """
    # In a real implementation, this would scrape the Golden Globes website
    # For demonstration, we'll create simulated data
    
    # Define categories that map to Oscar categories
    categories = [
        "Best Motion Picture – Drama",
        "Best Motion Picture – Musical or Comedy",
        "Best Director – Motion Picture",
        "Best Actor – Motion Picture Drama",
        "Best Actress – Motion Picture Drama",
        "Best Actor – Motion Picture Musical or Comedy",
        "Best Actress – Motion Picture Musical or Comedy",
        "Best Supporting Actor – Motion Picture",
        "Best Supporting Actress – Motion Picture",
        "Best Screenplay – Motion Picture"
    ]
    
    data = []
    
    # Create simulated data for each category
    for category in categories:
        # Create a winner and some nominees
        num_nominees = random.randint(3, 6)
        nominees = [f"{category} Nominee {i+1}" for i in range(num_nominees)]
        winner = random.choice(nominees)
        
        # Add to data
        for nominee in nominees:
            data.append({
                "year": year,
                "award_venue": "Golden Globes",
                "category": category,
                "nominee": nominee,
                "won": nominee == winner
            })
    
    # Convert to DataFrame
    return pd.DataFrame(data)

def get_critics_choice_data(year: int) -> pd.DataFrame:
    """
    Get Critics Choice awards data for the given year.
    
    Args:
        year: The year to retrieve Critics Choice data for
        
    Returns:
        DataFrame with Critics Choice data
    """
    # In a real implementation, this would scrape the Critics Choice website
    # For demonstration, we'll create simulated data
    
    # Define categories that map to Oscar categories
    categories = [
        "Best Picture",
        "Best Actor",
        "Best Actress",
        "Best Supporting Actor",
        "Best Supporting Actress",
        "Best Director",
        "Best Original Screenplay",
        "Best Adapted Screenplay",
        "Best Cinematography",
        "Best Editing"
    ]
    
    data = []
    
    # Create simulated data for each category
    for category in categories:
        # Create a winner and some nominees
        num_nominees = random.randint(5, 10)
        nominees = [f"{category} Nominee {i+1}" for i in range(num_nominees)]
        winner = random.choice(nominees)
        
        # Add to data
        for nominee in nominees:
            data.append({
                "year": year,
                "award_venue": "Critics Choice",
                "category": category,
                "nominee": nominee,
                "won": nominee == winner
            })
    
    # Convert to DataFrame
    return pd.DataFrame(data)

def get_sag_data(year: int) -> pd.DataFrame:
    """
    Get Screen Actors Guild (SAG) awards data for the given year.
    
    Args:
        year: The year to retrieve SAG data for
        
    Returns:
        DataFrame with SAG data
    """
    # In a real implementation, this would scrape the SAG website
    # For demonstration, we'll create simulated data
    
    # Define categories that map to Oscar categories
    categories = [
        "Outstanding Performance by a Cast in a Motion Picture",
        "Outstanding Performance by a Male Actor in a Leading Role",
        "Outstanding Performance by a Female Actor in a Leading Role",
        "Outstanding Performance by a Male Actor in a Supporting Role",
        "Outstanding Performance by a Female Actor in a Supporting Role"
    ]
    
    data = []
    
    # Create simulated data for each category
    for category in categories:
        # Create a winner and some nominees
        num_nominees = random.randint(3, 6)
        nominees = [f"{category} Nominee {i+1}" for i in range(num_nominees)]
        winner = random.choice(nominees)
        
        # Add to data
        for nominee in nominees:
            data.append({
                "year": year,
                "award_venue": "SAG",
                "category": category,
                "nominee": nominee,
                "won": nominee == winner
            })
    
    # Convert to DataFrame
    return pd.DataFrame(data)

def get_pga_data(year: int) -> pd.DataFrame:
    """
    Get Producers Guild of America (PGA) awards data for the given year.
    
    Args:
        year: The year to retrieve PGA data for
        
    Returns:
        DataFrame with PGA data
    """
    # In a real implementation, this would scrape the PGA website
    # For demonstration, we'll create simulated data
    
    # Define categories that map to Oscar categories
    categories = [
        "Outstanding Producer of Theatrical Motion Pictures"
    ]
    
    data = []
    
    # Create simulated data for each category
    for category in categories:
        # Create a winner and some nominees
        num_nominees = random.randint(8, 12)
        nominees = [f"{category} Nominee {i+1}" for i in range(num_nominees)]
        winner = random.choice(nominees)
        
        # Add to data
        for nominee in nominees:
            data.append({
                "year": year,
                "award_venue": "PGA",
                "category": category,
                "nominee": nominee,
                "won": nominee == winner
            })
    
    # Convert to DataFrame
    return pd.DataFrame(data)

def get_dga_data(year: int) -> pd.DataFrame:
    """
    Get Directors Guild of America (DGA) awards data for the given year.
    
    Args:
        year: The year to retrieve DGA data for
        
    Returns:
        DataFrame with DGA data
    """
    # In a real implementation, this would scrape the DGA website
    # For demonstration, we'll create simulated data
    
    # Define categories that map to Oscar categories
    categories = [
        "Outstanding Directorial Achievement in Motion Pictures"
    ]
    
    data = []
    
    # Create simulated data for each category
    for category in categories:
        # Create a winner and some nominees
        num_nominees = random.randint(5, 7)
        nominees = [f"{category} Nominee {i+1}" for i in range(num_nominees)]
        winner = random.choice(nominees)
        
        # Add to data
        for nominee in nominees:
            data.append({
                "year": year,
                "award_venue": "DGA",
                "category": category,
                "nominee": nominee,
                "won": nominee == winner
            })
    
    # Convert to DataFrame
    return pd.DataFrame(data)
