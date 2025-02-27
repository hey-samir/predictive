import pandas as pd
import numpy as np
from typing import Dict, List, Optional, Union, Tuple
from datetime import datetime

def map_award_category_to_oscar(award_venue: str, category: str) -> Optional[str]:
    """
    Map a category from a specific award venue to the corresponding Oscar category.
    
    Args:
        award_venue: The name of the award venue (e.g., "BAFTA", "Golden Globes")
        category: The category name in the award venue
        
    Returns:
        The corresponding Oscar category, or None if no mapping exists
    """
    # Define mappings from various award venues to Oscar categories
    mappings = {
        "BAFTA": {
            "Best Film": "Best Picture",
            "Leading Actor": "Actor in a Leading Role",
            "Leading Actress": "Actress in a Leading Role",
            "Supporting Actor": "Actor in a Supporting Role",
            "Supporting Actress": "Actress in a Supporting Role",
            "Director": "Directing",
            "Original Screenplay": "Writing (Original Screenplay)",
            "Adapted Screenplay": "Writing (Adapted Screenplay)",
            "Cinematography": "Cinematography",
            "Film Editing": "Film Editing"
        },
        "Golden Globes": {
            "Best Motion Picture – Drama": "Best Picture",
            "Best Motion Picture – Musical or Comedy": "Best Picture",
            "Best Director – Motion Picture": "Directing",
            "Best Actor – Motion Picture Drama": "Actor in a Leading Role",
            "Best Actress – Motion Picture Drama": "Actress in a Leading Role",
            "Best Actor – Motion Picture Musical or Comedy": "Actor in a Leading Role",
            "Best Actress – Motion Picture Musical or Comedy": "Actress in a Leading Role",
            "Best Supporting Actor – Motion Picture": "Actor in a Supporting Role",
            "Best Supporting Actress – Motion Picture": "Actress in a Supporting Role",
            "Best Screenplay – Motion Picture": ["Writing (Original Screenplay)", "Writing (Adapted Screenplay)"]
        },
        "Critics Choice": {
            "Best Picture": "Best Picture",
            "Best Actor": "Actor in a Leading Role",
            "Best Actress": "Actress in a Leading Role",
            "Best Supporting Actor": "Actor in a Supporting Role",
            "Best Supporting Actress": "Actress in a Supporting Role",
            "Best Director": "Directing",
            "Best Original Screenplay": "Writing (Original Screenplay)",
            "Best Adapted Screenplay": "Writing (Adapted Screenplay)",
            "Best Cinematography": "Cinematography",
            "Best Editing": "Film Editing"
        },
        "SAG": {
            "Outstanding Performance by a Cast in a Motion Picture": "Best Picture",
            "Outstanding Performance by a Male Actor in a Leading Role": "Actor in a Leading Role",
            "Outstanding Performance by a Female Actor in a Leading Role": "Actress in a Leading Role",
            "Outstanding Performance by a Male Actor in a Supporting Role": "Actor in a Supporting Role",
            "Outstanding Performance by a Female Actor in a Supporting Role": "Actress in a Supporting Role"
        },
        "PGA": {
            "Outstanding Producer of Theatrical Motion Pictures": "Best Picture"
        },
        "DGA": {
            "Outstanding Directorial Achievement in Motion Pictures": "Directing"
        }
    }
    
    # Check if mapping exists
    if award_venue in mappings and category in mappings[award_venue]:
        return mappings[award_venue][category]
    
    return None

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
    # Make a copy to avoid modifying the original
    processed_data = data.copy()
    
    # Convert year to numeric
    if 'year' in processed_data.columns:
        processed_data['year'] = pd.to_numeric(processed_data['year'], errors='coerce')
    
    # Fill missing values
    processed_data = processed_data.fillna({
        'is_winner': False,
        'nominee_film': '',
        'nominee_name': ''
    })
    
    # Add dummy scores for demonstration
    if include_critics and 'critics_score' not in processed_data.columns:
        processed_data['critics_score'] = np.random.uniform(60, 95, size=len(processed_data))
    
    if include_audience and 'audience_score' not in processed_data.columns:
        processed_data['audience_score'] = np.random.uniform(50, 90, size=len(processed_data))
    
    return processed_data

def get_current_nominees(year: int) -> pd.DataFrame:
    """
    Get current year's Oscar nominees.
    
    Args:
        year: The Oscar year
        
    Returns:
        DataFrame with current nominees
    """
    from data_collection.scraper import get_nominees_data
    
    # Get nominees data
    nominees_data = get_nominees_data(year)
    
    # Add critics and audience scores
    if not nominees_data.empty:
        nominees_data['critics_score'] = np.random.uniform(60, 95, size=len(nominees_data))
        nominees_data['audience_score'] = np.random.uniform(50, 90, size=len(nominees_data))
    
    return nominees_data

def merge_award_data(nominees_data: pd.DataFrame, awards_data: pd.DataFrame) -> pd.DataFrame:
    """
    Merge nominees data with awards data from other venues.
    
    Args:
        nominees_data: DataFrame with Oscar nominees
        awards_data: DataFrame with data from other award venues
        
    Returns:
        Merged DataFrame
    """
    # Create a copy to avoid modifying the original
    merged_data = nominees_data.copy()
    
    # Add columns for each award venue
    for award_venue in awards_data['award_venue'].unique():
        # Add a column for this venue
        merged_data[f'{award_venue}_won'] = False
        
        # Filter awards data for this venue
        venue_data = awards_data[awards_data['award_venue'] == award_venue]
        
        # Iterate through nominees
        for idx, row in merged_data.iterrows():
            # Get Oscar category
            oscar_category = row['category']
            
            # Find nominee in venue data
            nominee_matches = venue_data[
                (venue_data['nominee'].str.contains(row['nominee_name'], case=False, na=False)) & 
                (venue_data['won'] == True)
            ]
            
            if not nominee_matches.empty:
                # Check if any of the matches map to this Oscar category
                for _, match in nominee_matches.iterrows():
                    mapped_category = map_award_category_to_oscar(award_venue, match['category'])
                    
                    if mapped_category and (
                        (isinstance(mapped_category, str) and mapped_category == oscar_category) or
                        (isinstance(mapped_category, list) and oscar_category in mapped_category)
                    ):
                        merged_data.at[idx, f'{award_venue}_won'] = True
                        break
    
    return merged_data
