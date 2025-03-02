import streamlit as st
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import plotly.express as px
from datetime import datetime
import os
import random
import time

# Import project modules
from utils.constants import (
    AWARD_VENUES, OSCAR_CATEGORIES, NOMINATION_TYPES, 
    CURRENT_OSCAR_YEAR, THEME_COLORS, APP_SECTIONS
)
from models.predictor import OscarPredictor
from visualization.charts import plot_prediction_comparison, plot_venue_strength, plot_historical_accuracy
from data_collection.scraper import get_historical_data
from data_collection.betting_scraper import get_betting_odds, get_predictive_markets
from data_processing.data_processor import (
    process_historical_data, get_current_nominees, merge_award_data
)
from database.operations import (
    get_nominations_dataframe, get_model_weights_dataframe
)

# Set page config
st.set_page_config(
    page_title="Predictive.film",
    page_icon="🎬",
    layout="wide",
    initial_sidebar_state="collapsed",
    menu_items={
        'Get Help': None,
        'Report a bug': None,
        'About': None
    }
)

# Apply custom CSS
def apply_custom_css():
    """Apply custom CSS to the app."""
    st.markdown("""
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    
    html, body, [class*="css"] {
        font-family: 'Inter', sans-serif;
    }
    
    /* Set dark theme */
    .stApp {
        background-color: #1e2638;
        color: #ffffff;
    }
    
    /* Hide sidebar */
    section[data-testid="stSidebar"] {
        display: none !important;
    }
    
    /* Hide the Streamlit run button animation */
    button[kind="primaryFormSubmit"] {
        display: none !important;
    }
    
    /* Top navigation bar */
    .nav-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #1a2136;
        padding: 0.5rem 1rem;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        position: sticky;
        top: 0;
        z-index: 999;
    }
    
    .nav-logo {
        display: flex;
        align-items: center;
    }
    
    .nav-items {
        display: flex;
        gap: 1.5rem;
    }
    
    .nav-link {
        color: #e0e0e0;
        text-decoration: none;
        font-weight: 500;
        padding: 0.5rem 0;
        transition: color 0.2s ease;
    }
    
    .nav-link:hover, .nav-link.active {
        color: #8A3FFC;
        border-bottom: 2px solid #8A3FFC;
    }
    
    .nav-link.active {
        font-weight: 600;
    }
    
    /* Tabs styling */
    .stTabs [data-baseweb="tab-list"] {
        gap: 10px;
    }
    
    .stTabs [data-baseweb="tab"] {
        height: 50px;
        white-space: pre-wrap;
        border-radius: 4px 4px 0px 0px;
        gap: 1px;
        padding: 10px 20px;
        font-weight: 600;
        color: #e0e0e0;
    }
    
    .stTabs [aria-selected="true"] {
        background-color: rgba(138, 63, 252, 0.2);
        color: #8A3FFC;
    }
    
    /* Card styling */
    .category-card {
        border: 1px solid #2d3652;
        border-radius: 8px;
        padding: 16px;
        margin-bottom: 16px;
        background-color: #1a2136;
        box-shadow: 0 1px 3px rgba(0,0,0,0.3);
    }
    
    .nominee-card {
        border-left: 4px solid #8A3FFC;
        background-color: rgba(138, 63, 252, 0.1);
        padding: 10px;
        margin-top: 8px;
        border-radius: 4px;
    }
    
    .winner-card {
        border-left: 4px solid #4CAF50;
        background-color: rgba(76, 175, 80, 0.1);
    }
    
    /* Progress bar styling */
    .stProgress > div > div > div {
        background-color: #8A3FFC;
    }
    
    /* Text styling */
    h1, h2, h3, h4, h5, h6 {
        color: #ffffff;
    }
    
    .prediction-header {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 8px;
        color: #ffffff;
    }
    
    .prediction-subheader {
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 16px;
        color: #b0b0b0;
    }
    
    .top-margin {
        margin-top: 20px;
    }
    
    .nomination-type-header {
        background-color: #2d3652;
        padding: 10px 16px;
        border-radius: 4px;
        font-weight: 600;
        margin-bottom: 12px;
        color: #ffffff;
    }
    
    /* Footer styling */
    .footer {
        margin-top: 3rem;
        padding-top: 1rem;
        border-top: 1px solid #2d3652;
        text-align: center;
        color: #9E9E9E;
        font-size: 0.8rem;
    }
    
    /* Hide the hamburger menu */
    [data-testid="collapsedControl"] {
        display: none !important;
    }
    
    /* Override text elements */
    p, div, span {
        color: #e0e0e0;
    }
    
    /* Button styling */
    button.css-1x8cf1d {
        background-color: #8A3FFC;
        color: white;
    }
    
    button.css-1x8cf1d:hover {
        background-color: #7030d0;
        color: white;
    }
    
    </style>
    """, unsafe_allow_html=True)

apply_custom_css()

# Define nomination type descriptions for the UI
NOMINATION_TYPE_DESCRIPTIONS = {
    "Performer": "🎭 Performance categories for acting roles",
    "Creator": "🎬 Creative direction and writing categories",
    "Maker": "🏆 Film production and overall achievement categories",
    "Crafter": "🎨 Technical and artistic craft categories"
}

@st.cache_data(ttl=3600)
def load_historical_data(recent_years=None):
    """Load historical data with caching."""
    # Try to get from database first
    df = get_nominations_dataframe()
    
    # If database is empty, get from scraper
    if df.empty:
        df = get_historical_data(recent_years)
    
    return df

@st.cache_data(ttl=3600)
def load_current_nominees():
    """Load current Oscar nominees with caching."""
    return get_current_nominees(CURRENT_OSCAR_YEAR)

@st.cache_data(ttl=3600)
def load_awards_data():
    """Load awards data from other venues with caching."""
    # In a real application, this would scrape from various sources
    from data_collection.mock_data import generate_mock_awards_data
    return generate_mock_awards_data(CURRENT_OSCAR_YEAR)

@st.cache_data(ttl=3600)
def load_betting_data():
    """Load betting odds data with caching."""
    return get_betting_odds(CURRENT_OSCAR_YEAR)

@st.cache_data(ttl=3600)
def load_predictive_markets_data():
    """Load predictive markets data with caching."""
    return get_predictive_markets(CURRENT_OSCAR_YEAR)

def format_likelihood(value):
    """Format likelihood value with color coding."""
    color = "#4CAF50" if value >= 70 else "#FF9800" if value >= 40 else "#F44336"
    return f'<span style="color:{color};font-weight:600;">{value:.1f}%</span>'

def show_nominee_card(nominee, predictions_df=None, is_winner=False):
    """Display a nominee card with prediction data if available."""
    card_class = "nominee-card winner-card" if is_winner else "nominee-card"
    
    with st.container():
        st.markdown(f'<div class="{card_class}">', unsafe_allow_html=True)
        cols = st.columns([4, 2, 2, 2])
        
        with cols[0]:
            st.markdown(f"**{nominee['nominee_name']}**")
            if 'film_title' in nominee and nominee['film_title'] != nominee['nominee_name']:
                st.caption(f"*{nominee['film_title']}*")
        
        if predictions_df is not None:
            # Find prediction for this nominee
            category = nominee['category']
            name = nominee['nominee_name']
            prediction = predictions_df[
                (predictions_df['Award Category'] == category) & 
                (predictions_df['Nominee Name'] == name)
            ]
            
            if not prediction.empty:
                with cols[1]:
                    likelihood = prediction['Model Likelihood'].values[0]
                    st.markdown(f"Likelihood: {format_likelihood(likelihood)}", unsafe_allow_html=True)
                
                with cols[2]:
                    if 'Betting Odds' in prediction.columns:
                        betting = prediction['Betting Odds'].values[0]
                        st.markdown(f"Betting: {format_likelihood(betting)}", unsafe_allow_html=True)
                
                with cols[3]:
                    if 'Awards Venue Support' in prediction.columns:
                        support = prediction['Awards Venue Support'].values[0]
                        if support != "None":
                            venues = support.split(", ")
                            venue_str = ", ".join(venues[:2])
                            if len(venues) > 2:
                                venue_str += f" +{len(venues)-2}"
                            st.markdown(f"Support: **{venue_str}**")
        
        st.markdown('</div>', unsafe_allow_html=True)

def show_category_card(category, nominees, predictions_df=None):
    """Display a category card with all its nominees."""
    with st.container():
        st.markdown(f'<div class="category-card">', unsafe_allow_html=True)
        st.markdown(f"### {category}")
        
        # Sort nominees by prediction likelihood if available
        if predictions_df is not None:
            category_predictions = predictions_df[predictions_df['Award Category'] == category]
            if not category_predictions.empty:
                # Create a mapping of nominee names to likelihoods
                likelihood_map = {}
                for _, row in category_predictions.iterrows():
                    likelihood_map[row['Nominee Name']] = row['Model Likelihood']
                
                # Sort nominees by likelihood
                sorted_nominees = sorted(
                    nominees, 
                    key=lambda x: likelihood_map.get(x['nominee_name'], 0), 
                    reverse=True
                )
            else:
                sorted_nominees = nominees
        else:
            sorted_nominees = nominees
        
        # Display nominees
        for i, nominee in enumerate(sorted_nominees):
            show_nominee_card(
                nominee, 
                predictions_df=predictions_df,
                is_winner=(i == 0 and predictions_df is not None)
            )
        
        st.markdown('</div>', unsafe_allow_html=True)

def run_predictions():
    """Run predictions using the model."""
    # Create progress bar
    progress_bar = st.progress(0)
    status_text = st.empty()
    
    # Load data
    status_text.text("Loading historical data...")
    historical_data = load_historical_data()
    progress_bar.progress(20)
    
    status_text.text("Processing historical data...")
    processed_data = process_historical_data(historical_data)
    progress_bar.progress(30)
    
    status_text.text("Loading current nominees...")
    nominees_data = load_current_nominees()
    progress_bar.progress(40)
    
    status_text.text("Loading awards data from other venues...")
    awards_data = load_awards_data()
    progress_bar.progress(50)
    
    status_text.text("Merging awards data with nominees...")
    merged_data = merge_award_data(nominees_data, awards_data)
    progress_bar.progress(60)
    
    status_text.text("Training prediction model...")
    predictor = OscarPredictor()
    predictor.train(processed_data)
    progress_bar.progress(70)
    
    status_text.text("Making predictions...")
    predictions = predictor.predict(merged_data, awards_data)
    progress_bar.progress(80)
    
    status_text.text("Loading betting data...")
    betting_odds = load_betting_data()
    predictive_markets = load_predictive_markets_data()
    progress_bar.progress(90)
    
    status_text.text("Merging betting data with predictions...")
    merged_predictions = predictor.merge_with_betting_data(
        predictions, betting_odds, predictive_markets
    )
    progress_bar.progress(100)
    status_text.empty()
    
    return merged_predictions, predictor.analyze_venue_strength(processed_data)

def predictions_section():
    """Display the predictions section."""
    st.title("Oscar Predictions 2025")
    st.markdown("""
    Our model analyzes past award shows to predict Oscar winners. 
    We compare our predictions with betting odds and predictive markets to give you the most accurate forecast.
    """)
    
    # Add prediction refresh button
    col1, col2 = st.columns([5, 1])
    with col1:
        st.subheader("Nominee Predictions")
    with col2:
        refresh = st.button("Refresh Data")
    
    if refresh:
        # Clear cached data
        load_historical_data.clear()
        load_current_nominees.clear()
        load_awards_data.clear()
        load_betting_data.clear()
        load_predictive_markets_data.clear()
    
    # Run predictions
    with st.spinner("Running predictions..."):
        predictions, venue_strength = run_predictions()
    
    # Create tabs for each nomination type
    tabs = st.tabs([NOMINATION_TYPE_DESCRIPTIONS[n_type] for n_type in NOMINATION_TYPES.keys()])
    
    # Load nominees data
    nominees_data = load_current_nominees()
    
    # Populate tabs with nominees
    for i, (n_type, categories) in enumerate(NOMINATION_TYPES.items()):
        with tabs[i]:
            # Group nominees by category
            for category in categories:
                category_nominees = nominees_data[nominees_data['category'] == category]
                
                if not category_nominees.empty:
                    show_category_card(category, category_nominees.to_dict('records'), predictions)
    
    # Show prediction comparison chart
    st.subheader("Prediction Comparison")
    st.markdown("Compare our model's predictions with betting odds and predictive markets.")
    comparison_chart = plot_prediction_comparison(predictions)
    st.plotly_chart(comparison_chart, use_container_width=True)
    
    # Show venue strength analysis
    st.subheader("Award Venue Predictive Strength")
    st.markdown("Analyze which award shows are the best predictors for each Oscar category.")
    venue_chart = plot_venue_strength(venue_strength)
    st.plotly_chart(venue_chart, use_container_width=True)

def history_section():
    """Display the history section."""
    st.title("Historical Analysis")
    st.markdown("""
    Explore the historical accuracy of various award shows in predicting Oscar winners.
    See trends and patterns over time to understand which venues are the most reliable predictors.
    """)
    
    # Load historical data
    historical_data = load_historical_data()
    
    # Select venue for analysis
    venue = st.selectbox("Select Award Venue to Analyze", AWARD_VENUES)
    
    # Show historical accuracy chart
    st.subheader(f"Historical Accuracy: {venue}")
    st.markdown(f"Analyze how well {venue} has predicted Oscar winners over time.")
    history_chart = plot_historical_accuracy(historical_data, venue)
    st.plotly_chart(history_chart, use_container_width=True)
    
    # Show raw historical data
    st.subheader("Historical Data")
    st.markdown("Browse raw historical data for Oscar nominees and winners.")
    
    # Select year to filter
    years = sorted(historical_data['year'].unique(), reverse=True)
    if years:
        selected_year = st.selectbox("Select Year", years)
        year_data = historical_data[historical_data['year'] == selected_year]
        
        # Display data for selected year
        st.dataframe(year_data, use_container_width=True)
    else:
        st.info("No historical data available.")

def about_section():
    """Display the about section."""
    st.title("About Oscar Predictor")
    
    st.markdown("""
    ## How It Works
    
    Our Oscar prediction model analyzes past award ceremonies to find patterns and correlations 
    between various industry awards and the Academy Awards. By examining historical data, we 
    can identify which award venues are the best predictors for different Oscar categories.
    
    ### The Model
    
    1. **Historical Analysis**: We analyze years of historical data from the Oscars and other 
       award shows to identify patterns.
    
    2. **Venue Weighting**: Each award venue (BAFTA, Golden Globes, etc.) is assigned a weight 
       based on its historical accuracy in predicting Oscar winners.
    
    3. **Category-Specific Modeling**: We create separate models for each Oscar category, 
       recognizing that different award shows may be better predictors for different categories.
    
    4. **Integration with Betting Markets**: We compare our predictions with betting odds and 
       predictive markets to provide a comprehensive view.
    
    ### Nomination Types
    
    We group Oscar categories into four main types:
    
    - **Performers**: Acting categories (Lead/Supporting Actor/Actress)
    - **Creators**: Direction and writing categories
    - **Makers**: Overall film achievement categories
    - **Crafters**: Technical categories (Cinematography, Editing, etc.)
    
    ### Data Sources
    
    - Historical Oscar winners and nominees
    - Major award shows: BAFTA, Golden Globes, SAG, Critics Choice, etc.
    - Betting odds from major bookmakers
    - Predictive markets data
    
    ## Technical Implementation
    
    This application is built with:
    
    - **Python**: Core programming language
    - **Streamlit**: Web application framework
    - **Pandas & NumPy**: Data processing
    - **Plotly**: Interactive visualizations
    - **SQLAlchemy**: Database ORM
    - **PostgreSQL**: Database
    """)
    
    # Show team info
    st.subheader("The Team")
    st.markdown("""
    This project was developed by analytics experts passionate about film and data science. 
    Our goal is to bring transparency to the Oscar prediction process by combining historical 
    data analysis with modern machine learning techniques.
    """)

def main():
    """Main function to run the Streamlit app."""
    # Top navigation bar
    st.markdown("""
    <div class="nav-container">
        <div class="nav-logo">
            <img src="https://raw.githubusercontent.com/streamlit/streamlit/develop/lib/streamlit/static/media/favicon.png" width="30" style="margin-right: 10px;"/>
            <h2 style="margin: 0; color: #9C27B0;">Oscar Predictor</h2>
        </div>
        <div class="nav-items">
            <a href="?section=predictive_25" class="nav-link active" id="predictive-link">Predictive 25</a>
            <a href="?section=history" class="nav-link" id="history-link">History</a>
            <a href="?section=about" class="nav-link" id="about-link">About</a>
        </div>
    </div>
    """, unsafe_allow_html=True)
    
    # Get query parameters
    query_params = st.experimental_get_query_params()
    section = query_params.get("section", ["predictive_25"])[0]
    
    # JavaScript for making the correct nav link active
    js_code = f"""
    <script>
        // Remove active class from all links
        document.querySelectorAll('.nav-link').forEach(link => {{
            link.classList.remove('active');
        }});
        
        // Add active class to the current section link
        const currentSection = "{section}";
        if (currentSection === "predictive_25") {{
            document.getElementById('predictive-link').classList.add('active');
        }} else if (currentSection === "history") {{
            document.getElementById('history-link').classList.add('active');
        }} else if (currentSection === "about") {{
            document.getElementById('about-link').classList.add('active');
        }}
    </script>
    """
    st.markdown(js_code, unsafe_allow_html=True)
    
    # Display section based on query parameter
    if section == "history":
        history_section()
    elif section == "about":
        about_section()
    else:  # Default to predictions
        predictions_section()
    
    # Footer
    st.markdown("""
    <div class="footer">
        <p>© 2025 Oscar Predictor • Data updated: February 2025</p>
    </div>
    """, unsafe_allow_html=True)

if __name__ == "__main__":
    main()