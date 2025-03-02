import pandas as pd
import numpy as np
from typing import List, Dict, Any, Optional, Tuple
from utils.constants import OSCAR_CATEGORIES, AWARD_VENUES, NOMINATION_TYPES

def map_award_category_to_oscar(award_venue: str, category: str) -> Optional[str]:
    """
    Map a category from a specific award venue to the corresponding Oscar category.
    
    Args:
        award_venue: The name of the award venue (e.g., "BAFTA", "Golden Globes")
        category: The category name in the award venue
        
    Returns:
        The corresponding Oscar category, or None if no mapping exists
    """
    # Mapping dictionary from award venue categories to Oscar categories
    mappings = {
        "BAFTA": {
            "Best Film": "Best Picture",
            "Best Director": "Directing",
            "Best Actor in a Leading Role": "Actor in a Leading Role",
            "Best Actress in a Leading Role": "Actress in a Leading Role",
            "Best Actor in a Supporting Role": "Actor in a Supporting Role",
            "Best Actress in a Supporting Role": "Actress in a Supporting Role",
            "Best Original Screenplay": "Writing (Original Screenplay)",
            "Best Adapted Screenplay": "Writing (Adapted Screenplay)"
        },
        "Golden Globes": {
            "Best Motion Picture - Drama": "Best Picture",
            "Best Motion Picture - Musical or Comedy": "Best Picture",
            "Best Director": "Directing",
            "Best Actor - Drama": "Actor in a Leading Role",
            "Best Actor - Musical or Comedy": "Actor in a Leading Role",
            "Best Actress - Drama": "Actress in a Leading Role",
            "Best Actress - Musical or Comedy": "Actress in a Leading Role",
            "Best Supporting Actor": "Actor in a Supporting Role",
            "Best Supporting Actress": "Actress in a Supporting Role",
            "Best Screenplay": "Writing (Original Screenplay)"
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
            "Best Supporting Actress": "Actress in a Supporting Role",
            "Best Original Screenplay": "Writing (Original Screenplay)",
            "Best Adapted Screenplay": "Writing (Adapted Screenplay)"
        },
        "PGA": {
            "Best Theatrical Motion Picture": "Best Picture",
            "Outstanding Producer of Theatrical Motion Pictures": "Best Picture"
        },
        "DGA": {
            "Outstanding Directorial Achievement": "Directing",
            "Outstanding Directorial Achievement in Feature Film": "Directing"
        },
        "WGA": {
            "Best Original Screenplay": "Writing (Original Screenplay)",
            "Best Adapted Screenplay": "Writing (Adapted Screenplay)"
        }
    }
    
    # Check if mapping exists
    if award_venue in mappings and category in mappings[award_venue]:
        return mappings[award_venue][category]
    
    # Some generic mappings if exact match not found
    lower_category = category.lower()
    
    if "picture" in lower_category or "film" in lower_category:
        return "Best Picture"
    elif "director" in lower_category:
        return "Directing"
    elif "actor" in lower_category and "supporting" in lower_category and "male" in lower_category:
        return "Actor in a Supporting Role"
    elif "actor" in lower_category and "supporting" in lower_category and "female" in lower_category:
        return "Actress in a Supporting Role"
    elif "actor" in lower_category and "male" in lower_category:
        return "Actor in a Leading Role"
    elif "actor" in lower_category and "female" in lower_category:
        return "Actress in a Leading Role"
    elif "screenplay" in lower_category and "original" in lower_category:
        return "Writing (Original Screenplay)"
    elif "screenplay" in lower_category and "adapted" in lower_category:
        return "Writing (Adapted Screenplay)"
    elif "cinematography" in lower_category:
        return "Cinematography"
    elif "editing" in lower_category:
        return "Film Editing"
    elif "sound" in lower_category:
        return "Sound"
    elif "visual effects" in lower_category:
        return "Visual Effects"
    elif "production design" in lower_category or "art direction" in lower_category:
        return "Production Design"
    elif "costume" in lower_category:
        return "Costume Design"
    elif "makeup" in lower_category:
        return "Makeup and Hairstyling"
    elif "score" in lower_category or "music" in lower_category:
        return "Music (Original Score)"
    elif "song" in lower_category:
        return "Music (Original Song)"
    
    # No mapping found
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
    processed_data = data.copy()
    
    # Ensure required columns exist
    if 'year' not in processed_data.columns:
        processed_data['year'] = 0
    
    if 'category' not in processed_data.columns:
        processed_data['category'] = ''
    
    if 'nominee_name' not in processed_data.columns:
        processed_data['nominee_name'] = ''
    
    if 'film_title' not in processed_data.columns:
        processed_data['film_title'] = ''
    
    if 'won_oscar' not in processed_data.columns:
        processed_data['won_oscar'] = False
    
    # Add nomination_type if not present
    if 'nomination_type' not in processed_data.columns:
        processed_data['nomination_type'] = ''
        
        for n_type, categories in NOMINATION_TYPES.items():
            for category in categories:
                mask = processed_data['category'] == category
                processed_data.loc[mask, 'nomination_type'] = n_type
    
    # Drop columns if requested
    if not include_critics and 'critics_score' in processed_data.columns:
        processed_data = processed_data.drop(columns=['critics_score'])
    
    if not include_audience and 'audience_score' in processed_data.columns:
        processed_data = processed_data.drop(columns=['audience_score'])
    
    # Fill missing values
    for venue in AWARD_VENUES:
        venue_col = f"{venue}_won"
        if venue_col in processed_data.columns:
            processed_data[venue_col] = processed_data[venue_col].fillna(False)
    
    if include_critics and 'critics_score' in processed_data.columns:
        processed_data['critics_score'] = processed_data['critics_score'].fillna(
            processed_data['critics_score'].mean()
        )
    
    if include_audience and 'audience_score' in processed_data.columns:
        processed_data['audience_score'] = processed_data['audience_score'].fillna(
            processed_data['audience_score'].mean()
        )
    
    return processed_data

def get_current_nominees(year: int) -> pd.DataFrame:
    """
    Get current year's Oscar nominees.
    
    Args:
        year: The Oscar year
        
    Returns:
        DataFrame with current nominees
    """
    # In a real application, this would fetch nominees from a database or API
    # For now, we'll use our mock data generator
    from data_collection.mock_data import generate_mock_nominees_data
    return generate_mock_nominees_data(year)

def merge_award_data(nominees_data: pd.DataFrame, awards_data: pd.DataFrame) -> pd.DataFrame:
    """
    Merge nominees data with awards data from other venues.
    
    Args:
        nominees_data: DataFrame with Oscar nominees
        awards_data: DataFrame with data from other award venues
        
    Returns:
        Merged DataFrame
    """
    merged_data = nominees_data.copy()
    
    # Add columns for each award venue
    for venue in AWARD_VENUES:
        merged_data[f"{venue}_won"] = False
    
    # For each nominee, check if they won at any venue
    for idx, nominee in merged_data.iterrows():
        category = nominee['category']
        nominee_name = nominee['nominee_name']
        film_title = nominee.get('film_title', '')
        
        # Filter awards for this category
        category_awards = awards_data[awards_data['oscar_category'] == category]
        
        # Check each venue
        for venue in AWARD_VENUES:
            venue_awards = category_awards[category_awards['award_venue'] == venue]
            
            for _, award in venue_awards.iterrows():
                winner_name = award['winner_name']
                
                # Check if this nominee is the winner (either by name or film title)
                if winner_name == nominee_name or winner_name == film_title:
                    merged_data.loc[idx, f"{venue}_won"] = True
                    break
    
    return merged_data