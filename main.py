import streamlit as st
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import plotly.express as px
from datetime import datetime

from data_collection.scraper import get_nominees_data, get_historical_data
from data_collection.betting_scraper import get_betting_odds, get_predictive_markets
from data_collection.award_data import get_awards_data
from data_processing.data_processor import process_historical_data, get_current_nominees
from models.predictor import OscarPredictor
from visualization.charts import plot_prediction_comparison, plot_venue_strength
from utils.constants import OSCAR_CATEGORIES, AWARD_VENUES

# Set page configuration
st.set_page_config(
    page_title="Oscar Winner Predictor",
    page_icon="🏆",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Define application title and description
st.title("🎬 Oscar Winner Prediction Model")
st.markdown("""
This application predicts Oscar winners based on performance at other award shows and compares 
predictions with betting markets. The model analyzes historical data to determine the predictive 
strength of various award venues.
""")

# Sidebar for navigation and settings
with st.sidebar:
    st.header("Settings")
    
    # Year selection
    current_year = datetime.now().year
    prediction_year = st.selectbox(
        "Select prediction year:",
        range(current_year, current_year + 2),
        index=0
    )
    
    # Time span for historical data analysis
    st.subheader("Historical Data Range")
    use_recent = st.checkbox("Use recent years only", value=True)
    
    if use_recent:
        recent_years = st.slider(
            "Number of recent years to consider:",
            min_value=5,
            max_value=20,
            value=10,
            step=1
        )
    
    # Model settings
    st.subheader("Model Settings")
    include_critics = st.checkbox("Include critics scores", value=True)
    include_audience = st.checkbox("Include audience scores", value=True)
    
    # Refresh data
    if st.button("Refresh Data"):
        st.cache_data.clear()

# Main application
tabs = st.tabs(["Predictions", "Award Venue Analysis", "Methodology"])

# Predictions tab
with tabs[0]:
    st.header(f"Oscar Predictions for {prediction_year}")
    
    with st.spinner("Loading data and generating predictions..."):
        # Get historical data
        try:
            historical_data = get_historical_data(recent_years if use_recent else None)
            
            # Get current nominees
            current_nominees = get_current_nominees(prediction_year)
            
            # Get betting odds and predictive markets
            betting_odds = get_betting_odds(prediction_year)
            predictive_markets = get_predictive_markets(prediction_year)
            
            # Get awards data for current year
            awards_data = get_awards_data(prediction_year)
            
            # Process data
            processed_data = process_historical_data(
                historical_data, 
                include_critics=include_critics,
                include_audience=include_audience
            )
            
            # Initialize and train the model
            predictor = OscarPredictor()
            predictor.train(processed_data)
            
            # Generate predictions
            predictions = predictor.predict(
                current_nominees, 
                awards_data,
                recent_only=use_recent,
                recent_years=recent_years if use_recent else None
            )
            
            # Merge predictions with betting data
            merged_predictions = predictor.merge_with_betting_data(
                predictions, 
                betting_odds, 
                predictive_markets
            )
            
            # Display predictions table
            st.dataframe(
                merged_predictions,
                column_config={
                    "Award Category": st.column_config.TextColumn("Award Category"),
                    "Nominees": st.column_config.TextColumn("Nominees"),
                    "Recent Years Winner": st.column_config.TextColumn("Recent Years Winner"),
                    "All-time Winner": st.column_config.TextColumn("All-time Winner"),
                    "Awards Venue Support": st.column_config.TextColumn("Awards Venue Support"),
                    "Critics Score": st.column_config.NumberColumn("Critics Score", format="%.1f"),
                    "Audience Score": st.column_config.NumberColumn("Audience Score", format="%.1f"),
                    "Model Likelihood": st.column_config.ProgressColumn("Model Likelihood", format="%.1f%%", min_value=0, max_value=100),
                    "Betting Odds": st.column_config.ProgressColumn("Betting Odds", format="%.1f%%", min_value=0, max_value=100),
                    "Predictive Markets": st.column_config.ProgressColumn("Predictive Markets", format="%.1f%%", min_value=0, max_value=100)
                },
                use_container_width=True,
                hide_index=True
            )
            
            # Visual comparison of predictions vs. betting markets
            st.subheader("Visual Comparison: Model vs. Markets")
            comparison_fig = plot_prediction_comparison(merged_predictions)
            st.plotly_chart(comparison_fig, use_container_width=True)
            
        except Exception as e:
            st.error(f"Error generating predictions: {str(e)}")
            st.exception(e)

# Award Venue Analysis tab
with tabs[1]:
    st.header("Award Venue Predictive Strength Analysis")
    
    with st.spinner("Analyzing award venue predictive strength..."):
        try:
            if 'predictor' in locals() and 'processed_data' in locals():
                # Get venue strength analysis
                venue_strength = predictor.analyze_venue_strength(processed_data)
                
                # Display venue strength table
                st.dataframe(
                    venue_strength,
                    column_config={
                        "Award Category": st.column_config.TextColumn("Award Category"),
                        **{venue: st.column_config.ProgressColumn(venue, format="%.1f%%", min_value=0, max_value=100) 
                           for venue in AWARD_VENUES}
                    },
                    use_container_width=True,
                    hide_index=True
                )
                
                # Visual representation of venue strength
                st.subheader("Visual Representation of Venue Strength")
                venue_fig = plot_venue_strength(venue_strength)
                st.plotly_chart(venue_fig, use_container_width=True)
            else:
                st.warning("Please generate predictions first to see venue analysis.")
                
        except Exception as e:
            st.error(f"Error analyzing venue strength: {str(e)}")
            st.exception(e)

# Methodology tab
with tabs[2]:
    st.header("Methodology")
    
    st.subheader("Data Collection")
    st.markdown("""
    This application collects data from multiple sources:
    
    1. **Historical Oscar Data**: Winners and nominees from previous years
    2. **Other Award Shows**: Results from BAFTA, Golden Globes, Critics Choice, SAG, PGA, DGA, and film festivals
    3. **Critics and Audience Scores**: Aggregated ratings from review sites
    4. **Betting Odds**: Current betting odds from major bookmakers
    5. **Predictive Markets**: Odds from prediction markets
    
    Data is collected through targeted web scraping of publicly available information.
    """)
    
    st.subheader("Prediction Model")
    st.markdown("""
    The prediction model uses a weighted ensemble approach:
    
    1. **Historical Correlation**: Each award venue is weighted based on its historical correlation with Oscar winners
    2. **Recency Bias**: Recent years can be given higher importance to account for changing Academy voting patterns
    3. **Critical Reception**: Critics and audience scores are incorporated as additional factors
    4. **Feature Importance**: The model calculates the predictive strength of each award venue for each Oscar category
    
    The final prediction is a probability score indicating the likelihood of each nominee winning.
    """)
    
    st.subheader("Limitations")
    st.markdown("""
    The model has some inherent limitations:
    
    1. **Industry Changes**: The film industry and Academy demographics change over time
    2. **Limited Sample Size**: There's only one Oscar ceremony per year, limiting the training data
    3. **Outliers**: Occasional surprise winners that defy predictions
    4. **Data Availability**: Betting and predictive market data may be incomplete for some categories
    
    This tool is intended for informational purposes and entertainment only.
    """)

# Footer
st.markdown("---")
st.markdown("*This application is for personal use only and not affiliated with the Academy of Motion Picture Arts and Sciences.*")
