import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from typing import Dict, List, Optional, Union, Tuple

class OscarPredictor:
    """Model to predict Oscar winners based on other award show results."""
    
    def __init__(self):
        """Initialize the Oscar predictor model."""
        self.model = None
        self.label_encoders = {}
        self.feature_importances = {}
        self.category_models = {}
    
    def train(self, data: pd.DataFrame) -> None:
        """
        Train the model on historical data.
        
        Args:
            data: DataFrame with historical Oscar data
        """
        # Group by category for category-specific models
        categories = data['category'].unique()
        
        for category in categories:
            category_data = data[data['category'] == category].copy()
            
            if len(category_data) < 10:
                print(f"Not enough data to train model for category: {category}")
                continue
            
            # Prepare features and target
            X, y = self._prepare_data(category_data)
            
            if X.empty or len(np.unique(y)) < 2:
                print(f"Insufficient variation in data for category: {category}")
                continue
            
            # Split data for training and validation
            X_train, X_test, y_train, y_test = train_test_split(
                X, y, test_size=0.2, random_state=42
            )
            
            # Train Random Forest model
            model = RandomForestClassifier(n_estimators=100, random_state=42)
            model.fit(X_train, y_train)
            
            # Evaluate model
            accuracy = model.score(X_test, y_test)
            print(f"Model accuracy for {category}: {accuracy:.2f}")
            
            # Store model and feature importances
            self.category_models[category] = model
            
            # Store feature importances
            feature_importances = pd.DataFrame({
                'Feature': X.columns,
                'Importance': model.feature_importances_
            }).sort_values(by='Importance', ascending=False)
            
            self.feature_importances[category] = feature_importances
    
    def _prepare_data(self, data: pd.DataFrame) -> Tuple[pd.DataFrame, pd.Series]:
        """
        Prepare data for modeling.
        
        Args:
            data: DataFrame with Oscar data for a specific category
            
        Returns:
            Tuple of (features, target)
        """
        # Define features to use
        award_venues = [col for col in data.columns if col.endswith('_won')]
        score_columns = ['critics_score', 'audience_score']
        
        # Ensure we have the necessary columns
        features_to_use = [col for col in award_venues + score_columns if col in data.columns]
        
        if not features_to_use:
            return pd.DataFrame(), pd.Series(dtype=float)
        
        # Create feature matrix and target
        X = data[features_to_use].copy()
        y = data['is_winner'].astype(int)
        
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
        from data_processing.data_processor import merge_award_data
        
        # Merge nominees with awards data
        merged_data = merge_award_data(nominees, awards_data)
        
        # Group by category
        categories = merged_data['category'].unique()
        
        result_data = []
        
        for category in categories:
            category_data = merged_data[merged_data['category'] == category].copy()
            
            if category not in self.category_models:
                print(f"No model available for category: {category}")
                # Add without prediction
                for _, nominee in category_data.iterrows():
                    result_data.append({
                        'Award Category': category,
                        'Nominees': ", ".join(category_data['nominee_name']),
                        'Recent Years Winner': 'No model',
                        'All-time Winner': 'No model',
                        'Awards Venue Support': self._get_award_support(nominee),
                        'Critics Score': nominee.get('critics_score', 0),
                        'Audience Score': nominee.get('audience_score', 0),
                        'Model Likelihood': 0.0,
                        'nominee_name': nominee['nominee_name'],
                        'nominee_film': nominee.get('nominee_film', '')
                    })
                continue
            
            # Prepare features
            X = self._prepare_prediction_features(category_data)
            
            if X.empty:
                print(f"No features available for prediction in category: {category}")
                continue
            
            # Get models
            model = self.category_models[category]
            
            # Predict probabilities
            probabilities = model.predict_proba(X)
            
            # Get class with highest probability for each nominee
            win_probabilities = probabilities[:, 1] * 100  # Convert to percentage
            
            # Determine winners
            recent_winner_idx = np.argmax(win_probabilities)
            alltime_winner_idx = recent_winner_idx  # For now, same as recent
            
            # Add to result data
            for i, (_, nominee) in enumerate(category_data.iterrows()):
                result_data.append({
                    'Award Category': category,
                    'Nominees': ", ".join(category_data['nominee_name']),
                    'Recent Years Winner': nominee['nominee_name'] if i == recent_winner_idx else '',
                    'All-time Winner': nominee['nominee_name'] if i == alltime_winner_idx else '',
                    'Awards Venue Support': self._get_award_support(nominee),
                    'Critics Score': nominee.get('critics_score', 0),
                    'Audience Score': nominee.get('audience_score', 0),
                    'Model Likelihood': win_probabilities[i],
                    'nominee_name': nominee['nominee_name'],
                    'nominee_film': nominee.get('nominee_film', '')
                })
        
        # Convert to DataFrame
        result_df = pd.DataFrame(result_data)
        
        # Sort by category and likelihood
        result_df = result_df.sort_values(['Award Category', 'Model Likelihood'], ascending=[True, False])
        
        return result_df
    
    def _prepare_prediction_features(self, data: pd.DataFrame) -> pd.DataFrame:
        """
        Prepare features for prediction.
        
        Args:
            data: DataFrame with nominees data for a specific category
            
        Returns:
            Feature matrix for prediction
        """
        # Define features to use
        award_venues = [col for col in data.columns if col.endswith('_won')]
        score_columns = ['critics_score', 'audience_score']
        
        # Ensure we have the necessary columns
        features_to_use = [col for col in award_venues + score_columns if col in data.columns]
        
        if not features_to_use:
            return pd.DataFrame()
        
        # Create feature matrix
        X = data[features_to_use].copy()
        
        return X
    
    def _get_award_support(self, nominee: pd.Series) -> str:
        """
        Get a string listing the award venues that support this nominee.
        
        Args:
            nominee: Series with nominee data
            
        Returns:
            String with award venues that chose this nominee as winner
        """
        # Find award venue columns
        award_venue_cols = [col for col in nominee.index if col.endswith('_won')]
        
        # Get venues where this nominee won
        supporting_venues = [col.replace('_won', '') for col in award_venue_cols if nominee[col]]
        
        if supporting_venues:
            return ", ".join(supporting_venues)
        else:
            return "None"
    
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
        # Make a copy to avoid modifying the original
        merged_data = predictions.copy()
        
        # Add betting odds column if not already present
        if 'Betting Odds' not in merged_data.columns:
            merged_data['Betting Odds'] = 0.0
        
        # Add predictive markets column if not already present
        if 'Predictive Markets' not in merged_data.columns:
            merged_data['Predictive Markets'] = 0.0
        
        # Merge betting odds
        for idx, row in merged_data.iterrows():
            category = row['Award Category']
            nominee_name = row['nominee_name']
            
            # Find betting odds for this nominee
            odds_match = betting_odds[
                (betting_odds['category'] == category) & 
                (betting_odds['nominee'].str.contains(nominee_name, case=False, na=False))
            ]
            
            if not odds_match.empty:
                merged_data.at[idx, 'Betting Odds'] = odds_match.iloc[0]['betting_odds_percent']
            
            # Find predictive markets for this nominee
            markets_match = predictive_markets[
                (predictive_markets['category'] == category) & 
                (predictive_markets['nominee'].str.contains(nominee_name, case=False, na=False))
            ]
            
            if not markets_match.empty:
                merged_data.at[idx, 'Predictive Markets'] = markets_match.iloc[0]['predictive_market_percent']
        
        # Keep only the desired columns for output
        output_columns = [
            'Award Category', 'Nominees', 'Recent Years Winner', 'All-time Winner',
            'Awards Venue Support', 'Critics Score', 'Audience Score',
            'Model Likelihood', 'Betting Odds', 'Predictive Markets'
        ]
        
        return merged_data[output_columns]
    
    def analyze_venue_strength(self, historical_data: pd.DataFrame) -> pd.DataFrame:
        """
        Analyze the predictive strength of each award venue for each Oscar category.
        
        Args:
            historical_data: DataFrame with historical Oscar data
            
        Returns:
            DataFrame with predictive strength analysis
        """
        from utils.constants import OSCAR_CATEGORIES, AWARD_VENUES
        
        # Initialize results
        results = []
        
        # Analyze each category
        for category in OSCAR_CATEGORIES:
            category_data = historical_data[historical_data['category'] == category]
            
            if len(category_data) < 5:  # Need sufficient data
                continue
                
            row_data = {'Award Category': category}
            
            # Calculate predictive strength for each venue
            for venue in AWARD_VENUES:
                venue_col = f'{venue}_won'
                
                if venue_col not in category_data.columns or category_data[venue_col].sum() == 0:
                    # No data for this venue or no wins
                    row_data[venue] = 0.0
                    continue
                
                # Calculate how often venue winner matches Oscar winner
                matches = category_data[(category_data[venue_col] == True) & 
                                       (category_data['is_winner'] == True)]
                
                venue_winners = category_data[category_data[venue_col] == True]
                
                if len(venue_winners) > 0:
                    accuracy = len(matches) / len(venue_winners) * 100
                    row_data[venue] = accuracy
                else:
                    row_data[venue] = 0.0
            
            results.append(row_data)
        
        # Convert to DataFrame
        strength_df = pd.DataFrame(results)
        
        # Sort by category
        strength_df = strength_df.sort_values('Award Category')
        
        return strength_df
