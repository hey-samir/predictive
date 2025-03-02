"""Database operations for the application."""

import pandas as pd
from typing import List, Dict, Any, Optional
from database.db_setup import Nomination, AwardWin, Reference, ModelWeight, get_session

def get_nominations(year: Optional[int] = None, category: Optional[str] = None, 
                    nomination_type: Optional[str] = None) -> List[Dict[str, Any]]:
    """
    Get nominations from the database.
    
    Args:
        year: Filter by year
        category: Filter by category
        nomination_type: Filter by nomination type (Maker, Performer, Creator, Crafter)
        
    Returns:
        List of dictionaries with nomination data
    """
    session = get_session()
    if not session:
        return []
    
    try:
        # Build query
        query = session.query(Nomination)
        
        # Apply filters
        if year is not None:
            query = query.filter(Nomination.year == year)
        
        if category is not None:
            query = query.filter(Nomination.category == category)
        
        if nomination_type is not None:
            query = query.filter(Nomination.nomination_type == nomination_type)
        
        # Execute query
        nominations = query.all()
        
        # Convert to dictionaries
        result = []
        for nomination in nominations:
            # Get award wins for this nomination
            awards = []
            for award in nomination.awards:
                awards.append({
                    "award_venue": award.award_venue,
                    "award_category": award.award_category,
                    "won": award.won
                })
            
            # Get references for this nomination
            references = []
            for reference in nomination.references:
                references.append({
                    "reference_type": reference.reference_type,
                    "value": reference.value,
                    "source": reference.source
                })
            
            # Build nomination dictionary
            result.append({
                "id": nomination.id,
                "year": nomination.year,
                "category": nomination.category,
                "nomination_type": nomination.nomination_type,
                "nominee_name": nomination.nominee_name,
                "film_title": nomination.film_title,
                "won_oscar": nomination.won_oscar,
                "awards": awards,
                "references": references
            })
        
        return result
    finally:
        session.close()

def get_model_weights(year: Optional[int] = None, category: Optional[str] = None) -> List[Dict[str, Any]]:
    """
    Get model weights from the database.
    
    Args:
        year: Filter by year
        category: Filter by category
        
    Returns:
        List of dictionaries with model weight data
    """
    session = get_session()
    if not session:
        return []
    
    try:
        # Build query
        query = session.query(ModelWeight)
        
        # Apply filters
        if year is not None:
            query = query.filter(ModelWeight.year == year)
        
        if category is not None:
            query = query.filter(ModelWeight.category == category)
        
        # Execute query
        weights = query.all()
        
        # Convert to dictionaries
        result = []
        for weight in weights:
            result.append({
                "id": weight.id,
                "year": weight.year,
                "category": weight.category,
                "award_venue": weight.award_venue,
                "weight": weight.weight,
                "accuracy": weight.accuracy
            })
        
        return result
    finally:
        session.close()

def get_nominations_dataframe(year: Optional[int] = None) -> pd.DataFrame:
    """
    Get nominations as a pandas DataFrame.
    
    Args:
        year: Filter by year
        
    Returns:
        DataFrame with nominations data
    """
    # Get nominations as dictionaries
    nominations = get_nominations(year=year)
    
    if not nominations:
        return pd.DataFrame()
    
    # Prepare data for DataFrame
    data = []
    for nomination in nominations:
        record = {
            "id": nomination["id"],
            "year": nomination["year"],
            "category": nomination["category"],
            "nomination_type": nomination["nomination_type"],
            "nominee_name": nomination["nominee_name"],
            "film_title": nomination["film_title"],
            "won_oscar": nomination["won_oscar"]
        }
        
        # Add award wins
        for award in nomination["awards"]:
            venue = award["award_venue"]
            record[f"{venue}_won"] = award["won"]
        
        # Add references
        for reference in nomination["references"]:
            ref_type = reference["reference_type"]
            record[ref_type] = reference["value"]
        
        data.append(record)
    
    return pd.DataFrame(data)

def get_model_weights_dataframe(year: Optional[int] = None) -> pd.DataFrame:
    """
    Get model weights as a pandas DataFrame.
    
    Args:
        year: Filter by year
        
    Returns:
        DataFrame with model weights data
    """
    # Get model weights as dictionaries
    weights = get_model_weights(year=year)
    
    if not weights:
        return pd.DataFrame()
    
    return pd.DataFrame(weights)

def add_nomination(nomination_data: Dict[str, Any]) -> int:
    """
    Add a new nomination to the database.
    
    Args:
        nomination_data: Dictionary with nomination data
        
    Returns:
        ID of the newly created nomination
    """
    session = get_session()
    if not session:
        return 0
    
    try:
        # Create nomination object
        nomination = Nomination(
            year=nomination_data.get("year", 0),
            category=nomination_data.get("category", ""),
            nomination_type=nomination_data.get("nomination_type", ""),
            nominee_name=nomination_data.get("nominee_name", ""),
            film_title=nomination_data.get("film_title", ""),
            won_oscar=nomination_data.get("won_oscar", False)
        )
        
        # Add to session and flush to get ID
        session.add(nomination)
        session.flush()
        
        # Add award wins if provided
        awards_data = nomination_data.get("awards", [])
        for award_data in awards_data:
            award = AwardWin(
                nomination=nomination,
                award_venue=award_data.get("award_venue", ""),
                award_category=award_data.get("award_category", ""),
                won=award_data.get("won", False)
            )
            session.add(award)
        
        # Add references if provided
        references_data = nomination_data.get("references", [])
        for reference_data in references_data:
            reference = Reference(
                nomination=nomination,
                reference_type=reference_data.get("reference_type", ""),
                value=reference_data.get("value", 0.0),
                source=reference_data.get("source", "")
            )
            session.add(reference)
        
        # Commit and return ID
        session.commit()
        return nomination.id
    except Exception as e:
        # Roll back on error
        session.rollback()
        print(f"Error adding nomination: {e}")
        return 0
    finally:
        # Close the session
        session.close()

def update_nomination(nomination_id: int, nomination_data: Dict[str, Any]) -> bool:
    """
    Update an existing nomination.
    
    Args:
        nomination_id: ID of the nomination to update
        nomination_data: Dictionary with updated nomination data
        
    Returns:
        True if successful, False otherwise
    """
    session = get_session()
    if not session:
        return False
    
    try:
        # Get the nomination
        nomination = session.query(Nomination).filter(Nomination.id == nomination_id).first()
        
        if not nomination:
            return False
        
        # Update fields
        if "year" in nomination_data:
            nomination.year = nomination_data["year"]
        
        if "category" in nomination_data:
            nomination.category = nomination_data["category"]
        
        if "nomination_type" in nomination_data:
            nomination.nomination_type = nomination_data["nomination_type"]
        
        if "nominee_name" in nomination_data:
            nomination.nominee_name = nomination_data["nominee_name"]
        
        if "film_title" in nomination_data:
            nomination.film_title = nomination_data["film_title"]
        
        if "won_oscar" in nomination_data:
            nomination.won_oscar = nomination_data["won_oscar"]
        
        # Update award wins if provided
        if "awards" in nomination_data:
            # Delete existing awards
            for award in nomination.awards:
                session.delete(award)
            
            # Add new awards
            for award_data in nomination_data["awards"]:
                award = AwardWin(
                    nomination=nomination,
                    award_venue=award_data.get("award_venue", ""),
                    award_category=award_data.get("award_category", ""),
                    won=award_data.get("won", False)
                )
                session.add(award)
        
        # Update references if provided
        if "references" in nomination_data:
            # Delete existing references
            for reference in nomination.references:
                session.delete(reference)
            
            # Add new references
            for reference_data in nomination_data["references"]:
                reference = Reference(
                    nomination=nomination,
                    reference_type=reference_data.get("reference_type", ""),
                    value=reference_data.get("value", 0.0),
                    source=reference_data.get("source", "")
                )
                session.add(reference)
        
        # Commit the changes
        session.commit()
        return True
    except Exception as e:
        # Roll back on error
        session.rollback()
        print(f"Error updating nomination: {e}")
        return False
    finally:
        # Close the session
        session.close()

def delete_nomination(nomination_id: int) -> bool:
    """
    Delete a nomination from the database.
    
    Args:
        nomination_id: ID of the nomination to delete
        
    Returns:
        True if successful, False otherwise
    """
    session = get_session()
    if not session:
        return False
    
    try:
        # Get the nomination
        nomination = session.query(Nomination).filter(Nomination.id == nomination_id).first()
        
        if not nomination:
            return False
        
        # Delete the nomination (cascade will delete related awards and references)
        session.delete(nomination)
        session.commit()
        return True
    except Exception as e:
        # Roll back on error
        session.rollback()
        print(f"Error deleting nomination: {e}")
        return False
    finally:
        # Close the session
        session.close()

def add_model_weight(weight_data: Dict[str, Any]) -> int:
    """
    Add a new model weight to the database.
    
    Args:
        weight_data: Dictionary with model weight data
        
    Returns:
        ID of the newly created model weight
    """
    session = get_session()
    if not session:
        return 0
    
    try:
        # Create model weight object
        model_weight = ModelWeight(
            year=weight_data.get("year", 0),
            category=weight_data.get("category", ""),
            award_venue=weight_data.get("award_venue", ""),
            weight=weight_data.get("weight", 0.0),
            accuracy=weight_data.get("accuracy", 0.0)
        )
        
        # Add to session and commit
        session.add(model_weight)
        session.commit()
        return model_weight.id
    except Exception as e:
        # Roll back on error
        session.rollback()
        print(f"Error adding model weight: {e}")
        return 0
    finally:
        # Close the session
        session.close()

def update_model_weight(weight_id: int, weight_data: Dict[str, Any]) -> bool:
    """
    Update an existing model weight.
    
    Args:
        weight_id: ID of the model weight to update
        weight_data: Dictionary with updated model weight data
        
    Returns:
        True if successful, False otherwise
    """
    session = get_session()
    if not session:
        return False
    
    try:
        # Get the model weight
        model_weight = session.query(ModelWeight).filter(ModelWeight.id == weight_id).first()
        
        if not model_weight:
            return False
        
        # Update fields
        if "year" in weight_data:
            model_weight.year = weight_data["year"]
        
        if "category" in weight_data:
            model_weight.category = weight_data["category"]
        
        if "award_venue" in weight_data:
            model_weight.award_venue = weight_data["award_venue"]
        
        if "weight" in weight_data:
            model_weight.weight = weight_data["weight"]
        
        if "accuracy" in weight_data:
            model_weight.accuracy = weight_data["accuracy"]
        
        # Commit the changes
        session.commit()
        return True
    except Exception as e:
        # Roll back on error
        session.rollback()
        print(f"Error updating model weight: {e}")
        return False
    finally:
        # Close the session
        session.close()

def delete_model_weight(weight_id: int) -> bool:
    """
    Delete a model weight from the database.
    
    Args:
        weight_id: ID of the model weight to delete
        
    Returns:
        True if successful, False otherwise
    """
    session = get_session()
    if not session:
        return False
    
    try:
        # Get the model weight
        model_weight = session.query(ModelWeight).filter(ModelWeight.id == weight_id).first()
        
        if not model_weight:
            return False
        
        # Delete the model weight
        session.delete(model_weight)
        session.commit()
        return True
    except Exception as e:
        # Roll back on error
        session.rollback()
        print(f"Error deleting model weight: {e}")
        return False
    finally:
        # Close the session
        session.close()