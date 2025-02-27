import pandas as pd
import numpy as np
from typing import List, Dict, Any, Optional, Tuple
from utils.constants import AWARD_VENUES

class OscarPredictor:
    """Model to predict Oscar winners based on other award show results."""
    
    def __init__(self):
        """Initialize the Oscar predictor model."""
        self.model_weights = {}
        self.venue_weights = {}
        self.trained = False
    
    def train(self, data: pd.DataFrame) -> None:
        """
        Train the model on historical data.
        
        Args:
            data: DataFrame with historical Oscar data
        """
        # Calculate the correlation between each award venue and Oscar wins
        for category in data['category'].unique():
            category_data = data[data['category'] == category]
            
            if len(category_data) == 0:
                continue
                
            # Calculate weights for each venue
            venue_weights = {}
            for venue in AWARD_VENUES:
                venue_col = f"{venue}_won"
                
                if venue_col in category_data.columns:
                    # Calculate correlation coefficient between venue win and Oscar win
                    # If correlation is not valid (NaN), use default weight of 0.5
                    try:
                        correlation = category_data[[venue_col, 'won_oscar']].corr().iloc[0, 1]
                        if np.isnan(correlation):
                            correlation = 0.5
                    except:
                        correlation = 0.5
                    
                    # Scale to [0,1] and ensure positive weight
                    weight = max(0, (correlation + 1) / 2)
                    venue_weights[venue] = weight
            
            # Store weights for this category
            self.model_weights[category] = venue_weights
        
        # Calculate overall venue weights across all categories
        all_weights = {}
        for venue in AWARD_VENUES:
            weights = [weights.get(venue, 0) for weights in self.model_weights.values()]
            if weights:
                all_weights[venue] = sum(weights) / len(weights)
        
        self.venue_weights = all_weights
        self.trained = True
    
    def _prepare_data(self, data: pd.DataFrame) -> Tuple[pd.DataFrame, pd.Series]:
        """
        Prepare data for modeling.
        
        Args:
            data: DataFrame with Oscar data for a specific category
            
        Returns:
            Tuple of (features, target)
        """
        # Extract relevant columns
        venue_cols = [f"{venue}_won" for venue in AWARD_VENUES 
                     if f"{venue}_won" in data.columns]
        
        feature_cols = venue_cols.copy()
        
        # Add critics and audience scores if available
        if 'critics_score' in data.columns:
            feature_cols.append('critics_score')
        
        if 'audience_score' in data.columns:
            feature_cols.append('audience_score')
        
        # Extract features and target
        if not feature_cols:
            return pd.DataFrame(), pd.Series()
            
        X = data[feature_cols]
        y = data['won_oscar'] if 'won_oscar' in data.columns else pd.Series()
        
        return X, y
    
    def predict(self, nominees: pd.DataFrame, awards_data: pd.DataFrame, 
                recent_only: bool = False, recent_years: Optional[int] = None) -> pd.DataFrame:
        """
        Predict Oscar winners for current nominees.
        
        Args:
            nominees: DataFrame with current Oscar nominees
            awards_data: DataFrame with current awards data from other venues
            recent_only: Whether to use only recent years model
            recent_years: Number of recent years to consider if recent_only is True
            
        Returns:
            DataFrame with predictions
        """
        if not self.trained:
            raise ValueError("Model must be trained before making predictions")
        
        # Prepare predictions DataFrame
        predictions = []
        
        # Process each category
        for category in nominees['category'].unique():
            category_nominees = nominees[nominees['category'] == category]
            
            # Skip if no nominees for this category
            if len(category_nominees) == 0:
                continue
            
            # Get weights for this category (or default to general weights)
            category_weights = self.model_weights.get(category, {})
            
            # Get awards data for this category
            category_awards = awards_data[awards_data['oscar_category'] == category]
            
            # Prepare prediction features for each nominee
            for _, nominee in category_nominees.iterrows():
                features = self._prepare_prediction_features(nominee, category_awards, category_weights)
                
                # Calculate likelihood score based on features and weights
                likelihood = self._calculate_likelihood(features, category_weights)
                
                # Create prediction entry
                prediction = {
                    "Award Category": category,
                    "Nominee Name": nominee['nominee_name'],
                    "Film Title": nominee.get('film_title', ''),
                    "Nomination Type": nominee.get('nomination_type', ''),
                    "Model Likelihood": likelihood,
                    "Awards Venue Support": self._get_award_support(features),
                    "Critics Score": nominee.get('critics_score', 0),
                    "Audience Score": nominee.get('audience_score', 0)
                }
                
                # Identify which model provides this prediction
                if recent_only:
                    prediction["Recent Years Winner"] = nominee['nominee_name']
                    prediction["All-time Winner"] = ""
                else:
                    prediction["All-time Winner"] = nominee['nominee_name']
                    prediction["Recent Years Winner"] = ""
                
                predictions.append(prediction)
        
        # Return as DataFrame
        if not predictions:
            return pd.DataFrame()
            
        return pd.DataFrame(predictions)
    
    def _prepare_prediction_features(self, nominee: pd.Series, awards_data: pd.DataFrame, 
                                    category_weights: Dict[str, float]) -> Dict[str, Any]:
        """
        Prepare features for prediction.
        
        Args:
            nominee: Series with nominee data
            awards_data: DataFrame with awards data for the relevant category
            category_weights: Dictionary with weights for each venue
            
        Returns:
            Feature dictionary for prediction
        """
        features = {
            "nominee_name": nominee['nominee_name'],
            "film_title": nominee.get('film_title', ''),
        }
        
        # Add critics and audience scores if available
        if 'critics_score' in nominee:
            features['critics_score'] = nominee['critics_score']
        
        if 'audience_score' in nominee:
            features['audience_score'] = nominee['audience_score']
        
        # Check which venues have selected this nominee
        for venue in AWARD_VENUES:
            # Check if this venue has an award for this category
            venue_awards = awards_data[awards_data['award_venue'] == venue]
            
            if len(venue_awards) > 0:
                # Check if this nominee is the winner
                is_winner = False
                for _, award in venue_awards.iterrows():
                    if award['winner_name'] == nominee['nominee_name'] or award['winner_name'] == nominee.get('film_title', ''):
                        is_winner = True
                        break
                
                features[f"{venue}_won"] = is_winner
            else:
                features[f"{venue}_won"] = False
        
        return features
    
    def _calculate_likelihood(self, features: Dict[str, Any], 
                             category_weights: Dict[str, float]) -> float:
        """
        Calculate prediction likelihood based on features and weights.
        
        Args:
            features: Feature dictionary for the nominee
            category_weights: Dictionary with weights for each venue
            
        Returns:
            Likelihood score (0-100)
        """
        score = 0.0
        total_weight = 0.0
        
        # Calculate score based on award wins
        for venue in AWARD_VENUES:
            venue_key = f"{venue}_won"
            
            if venue_key in features:
                # Get weight for this venue (default to 0.5 if not available)
                weight = category_weights.get(venue, 0.5)
                
                # Add to score if nominee won at this venue
                if features[venue_key]:
                    score += weight
                
                total_weight += weight
        
        # Normalize to ensure we have a valid score when no weights are available
        if total_weight == 0:
            total_weight = 1.0
        
        # Add critic and audience scores (with smaller weights)
        if 'critics_score' in features:
            critic_weight = 0.2 * total_weight  # 20% of total venue weights
            score += (features['critics_score'] / 100) * critic_weight
            total_weight += critic_weight
        
        if 'audience_score' in features:
            audience_weight = 0.1 * total_weight  # 10% of total venue weights
            score += (features['audience_score'] / 100) * audience_weight
            total_weight += audience_weight
        
        # Calculate final likelihood as a percentage
        if total_weight > 0:
            likelihood = (score / total_weight) * 100
        else:
            likelihood = 0
        
        return round(likelihood, 1)
    
    def _get_award_support(self, features: Dict[str, Any]) -> str:
        """
        Get a string listing the award venues that support this nominee.
        
        Args:
            features: Feature dictionary for the nominee
            
        Returns:
            String with award venues that chose this nominee as winner
        """
        support = []
        
        for venue in AWARD_VENUES:
            venue_key = f"{venue}_won"
            
            if venue_key in features and features[venue_key]:
                support.append(venue)
        
        if not support:
            return "None"
        
        return ", ".join(support)
    
    def merge_with_betting_data(self, predictions: pd.DataFrame, 
                             betting_odds: pd.DataFrame, 
                             predictive_markets: pd.DataFrame) -> pd.DataFrame:
        """
        Merge predictions with betting odds and predictive markets data.
        
        Args:
            predictions: DataFrame with model predictions
            betting_odds: DataFrame with betting odds
            predictive_markets: DataFrame with predictive markets data
            
        Returns:
            Merged DataFrame
        """
        if predictions.empty:
            return predictions
            
        # Make a copy to avoid modifying the original
        merged = predictions.copy()
        
        # Add betting odds
        for _, row in betting_odds.iterrows():
            category = row.get('category', '')
            nominee = row.get('nominee', '')
            odds = row.get('probability', 0)
            
            # Find matching prediction
            mask = (merged['Award Category'] == category) & (
                (merged['Nominee Name'] == nominee) | (merged['Film Title'] == nominee)
            )
            
            if mask.any():
                merged.loc[mask, 'Betting Odds'] = odds
        
        # Add predictive markets
        for _, row in predictive_markets.iterrows():
            category = row.get('category', '')
            nominee = row.get('nominee', '')
            probability = row.get('probability', 0)
            
            # Find matching prediction
            mask = (merged['Award Category'] == category) & (
                (merged['Nominee Name'] == nominee) | (merged['Film Title'] == nominee)
            )
            
            if mask.any():
                merged.loc[mask, 'Predictive Markets'] = probability
        
        # Fill missing values with 0
        if 'Betting Odds' in merged.columns:
            merged['Betting Odds'] = merged['Betting Odds'].fillna(0)
        else:
            merged['Betting Odds'] = 0
            
        if 'Predictive Markets' in merged.columns:
            merged['Predictive Markets'] = merged['Predictive Markets'].fillna(0)
        else:
            merged['Predictive Markets'] = 0
        
        return merged
    
    def analyze_venue_strength(self, historical_data: pd.DataFrame) -> pd.DataFrame:
        """
        Analyze the predictive strength of each award venue for each Oscar category.
        
        Args:
            historical_data: DataFrame with historical Oscar data
            
        Returns:
            DataFrame with predictive strength analysis
        """
        if not self.trained:
            raise ValueError("Model must be trained before analyzing venue strength")
        
        # Prepare results DataFrame
        results = []
        
        # Process each Oscar category
        for category in self.model_weights.keys():
            row = {"Award Category": category}
            
            # Add predictive strength for each venue
            for venue, weight in self.model_weights[category].items():
                row[venue] = weight * 100  # Convert to percentage
            
            results.append(row)
        
        # Return as DataFrame
        if not results:
            return pd.DataFrame()
            
        return pd.DataFrame(results)