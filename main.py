import streamlit as st
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import plotly.express as px
from datetime import datetime

from data_collection.mock_data import generate_mock_historical_data, generate_mock_nominees_data, generate_mock_awards_data
from data_collection.betting_scraper import get_betting_odds, get_predictive_markets
from data_processing.data_processor import process_historical_data, get_current_nominees
from models.predictor import OscarPredictor
from visualization.charts import plot_prediction_comparison, plot_venue_strength
from utils.constants import OSCAR_CATEGORIES, AWARD_VENUES

# Set page configuration
st.set_page_config(
    page_title="Predictive",
    page_icon="🎬",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for styling
st.markdown("""
<style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
    
    html, body, [class*="css"] {
        font-family: 'Inter', sans-serif;
    }
    
    /* Theme colors */
    :root {
        --purple-primary: #6b46c1;
        --purple-secondary: #9f7aea;
        --purple-light: #d6bcfa;
    }
    
    /* Header styling */
    .main-header {
        background: linear-gradient(90deg, #6b46c1 0%, #9f7aea 100%);
        padding: 1rem;
        border-radius: 10px;
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
    }
    
    .logo-container {
        margin-right: 15px;
    }
    
    .logo {
        background: linear-gradient(135deg, #6b46c1 0%, #9f7aea 100%);
        width: 50px;
        height: 50px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .title-container {
        color: white;
    }
    
    /* Navigation bar */
    .nav-container {
        display: flex;
        justify-content: space-between;
        padding: 0.5rem 0;
        border-bottom: 1px solid #e2e8f0;
        margin-bottom: 1rem;
    }
    
    .nav-item {
        padding: 0.5rem 1rem;
        margin: 0 0.25rem;
        border-radius: 5px;
        cursor: pointer;
        text-decoration: none;
        color: #4a5568;
        font-weight: 500;
    }
    
    .nav-item:hover {
        background-color: #f7fafc;
    }
    
    .nav-item.active {
        background-color: var(--purple-light);
        color: var(--purple-primary);
    }
    
    /* Award card styling */
    .award-card {
        background-color: white;
        border-radius: 10px;
        padding: 1rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        margin-bottom: 1rem;
        border-left: 4px solid var(--purple-primary);
    }
    
    .award-category {
        color: #4a5568;
        font-size: 0.9rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
    }
    
    .winner-name {
        font-size: 1.2rem;
        font-weight: 700;
        color: #1a202c;
        margin-bottom: 0.5rem;
    }
    
    .likelihood {
        color: var(--purple-primary);
        font-weight: 600;
        font-size: 1.1rem;
    }
    
    /* Tab styling for Award/Venue sections */
    .stTabs [data-baseweb="tab-list"] {
        gap: 1rem;
    }
    
    .stTabs [data-baseweb="tab"] {
        height: 3rem;
        white-space: pre-wrap;
        background-color: white;
        border-radius: 4px 4px 0 0;
        gap: 1rem;
        padding-top: 10px;
        padding-bottom: 10px;
        border-left: 1px solid #e2e8f0;
        border-right: 1px solid #e2e8f0;
        border-top: 1px solid #e2e8f0;
        border-bottom: 1px solid transparent;
    }
    
    .stTabs [aria-selected="true"] {
        background-color: white;
        border-bottom: 2px solid var(--purple-primary);
    }
    
    /* Button styling */
    .stButton>button {
        background-color: var(--purple-primary);
        color: white;
        border-radius: 4px;
        padding: 0.5rem 1rem;
        font-weight: 500;
    }
    
    .stButton>button:hover {
        background-color: var(--purple-secondary);
    }
    
    /* Footer styling */
    .footer {
        margin-top: 2rem;
        padding-top: 1rem;
        border-top: 1px solid #e2e8f0;
        text-align: center;
        color: #718096;
        font-size: 0.9rem;
    }
    
    /* Progress bar colors */
    .stProgress > div > div {
        background-color: var(--purple-primary);
    }
</style>
""", unsafe_allow_html=True)

# Custom header with logo
st.markdown("""
<div class="main-header">
    <div class="logo-container">
        <div class="logo">
            <span style="font-size: 24px; color: white;">🎬</span>
        </div>
    </div>
    <div class="title-container">
        <h1 style="margin: 0; font-size: 24px;">Predictive</h1>
    </div>
</div>
""", unsafe_allow_html=True)

# App description
st.markdown("""
Predictive uses sophisticated algorithms to predict the top Academy Award winners.
""")

# Settings in the sidebar (always visible)
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

# Navigation tabs
nav_options = ["Predictive 25", "History", "About"]
nav = st.radio("Navigation", nav_options, horizontal=True, label_visibility="collapsed")

# Main content based on navigation
if nav == "Predictive 25":
    # Predictive 25 page with sliding tabs
    predict_tabs = st.tabs(["Award Predictive", "Venue Predictive"])
    
    # Award Predictive tab
    with predict_tabs[0]:
        st.header("Award Predictions for 2025")
        
        with st.spinner("Loading data and generating predictions..."):
            try:
                # Get historical data
                historical_data = generate_mock_historical_data(recent_years if use_recent else None)
                
                # Get current nominees
                current_nominees = generate_mock_nominees_data(prediction_year)
                
                # Get betting odds and predictive markets
                betting_odds = get_betting_odds(prediction_year)
                predictive_markets = get_predictive_markets(prediction_year)
                
                # Get awards data for current year
                awards_data = generate_mock_awards_data(prediction_year)
                
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
                
                # Display award cards for top categories
                cols = st.columns(3)
                top_categories = ["Best Picture", "Actor in a Leading Role", "Actress in a Leading Role", 
                                 "Directing", "Actor in a Supporting Role", "Actress in a Supporting Role"]
                
                col_idx = 0
                for category in top_categories:
                    category_preds = merged_predictions[merged_predictions["Award Category"] == category]
                    
                    if not category_preds.empty:
                        # Get the top prediction
                        top_pred = category_preds.sort_values("Model Likelihood", ascending=False).iloc[0]
                        
                        with cols[col_idx % 3]:
                            st.markdown(f"""
                            <div class="award-card">
                                <div class="award-category">{category}</div>
                                <div class="winner-name">{top_pred["Recent Years Winner"]}</div>
                                <div class="likelihood">{top_pred["Model Likelihood"]:.1f}% likelihood</div>
                            </div>
                            """, unsafe_allow_html=True)
                        
                        col_idx += 1
                
                # Display full predictions table
                st.subheader("Complete Predictions")
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
                
                # Visual comparison
                st.subheader("Visual Comparison: Model vs. Markets")
                comparison_fig = plot_prediction_comparison(merged_predictions)
                st.plotly_chart(comparison_fig, use_container_width=True)
                
            except Exception as e:
                st.error(f"Error generating predictions: {str(e)}")
                st.exception(e)
    
    # Venue Predictive tab
    with predict_tabs[1]:
        st.header("Award Venue Predictive Strength")
        
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

elif nav == "History":
    st.header("Historical Oscar Predictions")
    st.info("Historical data analysis will be shown here.")
    # Add historical prediction analysis here
    
elif nav == "About":
    st.header("About Predictive")
    
    st.markdown("""
    Predictive is an advanced analytics tool that forecasts Academy Award winners 
    using data from historical Oscar ceremonies, other award shows, and market predictions.
    """)
    
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
st.markdown("""
<div class="footer">
    Built by <a href="https://samir.xyz" target="_blank">Interspace Ventures</a> for personal use using 
    <a href="https://replit.com" target="_blank">Replit AI</a> and 
    <a href="https://streamlit.io" target="_blank">Streamlit</a>
</div>
""", unsafe_allow_html=True)
