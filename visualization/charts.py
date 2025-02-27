import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import plotly.express as px
import plotly.graph_objects as go
from typing import Dict, List, Optional, Union

def plot_prediction_comparison(predictions: pd.DataFrame) -> go.Figure:
    """
    Create a visual comparison of model predictions vs. betting odds and predictive markets.
    
    Args:
        predictions: DataFrame with predictions and market data
        
    Returns:
        Plotly figure with comparison
    """
    # Filter out rows where all values are the same
    categories = predictions['Award Category'].unique()
    
    plot_data = []
    
    for category in categories:
        category_data = predictions[predictions['Award Category'] == category].copy()
        
        # Sort by model likelihood descending
        category_data = category_data.sort_values('Model Likelihood', ascending=False)
        
        # Take top 3 nominees for readability
        top_data = category_data.head(3)
        
        # Add to plot data
        for _, row in top_data.iterrows():
            plot_data.append({
                'Category': category,
                'Nominee': row.get('nominee_name', 'Unknown'),
                'Source': 'Model',
                'Probability': row['Model Likelihood']
            })
            plot_data.append({
                'Category': category,
                'Nominee': row.get('nominee_name', 'Unknown'),
                'Source': 'Betting Odds',
                'Probability': row['Betting Odds']
            })
            plot_data.append({
                'Category': category,
                'Nominee': row.get('nominee_name', 'Unknown'),
                'Source': 'Predictive Markets',
                'Probability': row['Predictive Markets']
            })
    
    # Create DataFrame for plotting
    plot_df = pd.DataFrame(plot_data)
    
    # Create the figure
    fig = px.bar(
        plot_df, 
        x='Nominee', 
        y='Probability',
        color='Source',
        barmode='group',
        facet_col='Category',
        facet_col_wrap=2,
        title='Prediction Comparison: Model vs. Markets',
        labels={'Probability': 'Win Probability (%)', 'Nominee': ''},
        height=600,
        color_discrete_map={
            'Model': '#1f77b4',
            'Betting Odds': '#ff7f0e',
            'Predictive Markets': '#2ca02c'
        }
    )
    
    # Update layout for better readability
    fig.update_layout(
        font=dict(size=10),
        legend=dict(
            orientation='h',
            yanchor='bottom',
            y=1.02,
            xanchor='right',
            x=1
        ),
        margin=dict(t=80, b=50, l=50, r=50)
    )
    
    # Update facet formatting
    fig.for_each_annotation(lambda a: a.update(text=a.text.split("=")[-1]))
    
    return fig

def plot_venue_strength(venue_strength: pd.DataFrame) -> go.Figure:
    """
    Create a visual representation of award venue predictive strength.
    
    Args:
        venue_strength: DataFrame with venue predictive strength analysis
        
    Returns:
        Plotly figure with venue strength visualization
    """
    # Melt the DataFrame for easier plotting
    venue_cols = [col for col in venue_strength.columns if col != 'Award Category']
    
    # Check if empty
    if venue_strength.empty or not venue_cols:
        # Create empty figure with message
        fig = go.Figure()
        fig.add_annotation(
            text="No venue strength data available",
            xref="paper", yref="paper",
            x=0.5, y=0.5,
            showarrow=False,
            font=dict(size=14)
        )
        return fig
    
    melted_df = pd.melt(
        venue_strength,
        id_vars=['Award Category'],
        value_vars=venue_cols,
        var_name='Award Venue',
        value_name='Predictive Strength'
    )
    
    # Create the figure
    fig = px.bar(
        melted_df,
        x='Award Venue',
        y='Predictive Strength',
        color='Award Venue',
        facet_row='Award Category',
        title='Award Venue Predictive Strength by Category',
        labels={'Predictive Strength': 'Predictive Strength (%)'},
        height=800,
        range_y=[0, 100]
    )
    
    # Update layout for better readability
    fig.update_layout(
        font=dict(size=10),
        showlegend=False,
        margin=dict(t=80, b=50, l=100, r=50),
        xaxis=dict(tickangle=-45)
    )
    
    # Add horizontal line at 50% for reference
    fig.add_shape(
        type='line',
        x0=-0.5,
        x1=len(venue_cols) - 0.5,
        y0=50,
        y1=50,
        line=dict(
            color='red',
            width=1,
            dash='dash'
        ),
        xref='x',
        yref='y'
    )
    
    # Update facet formatting
    fig.for_each_annotation(lambda a: a.update(text=a.text.split("=")[-1]))
    
    return fig

def plot_historical_accuracy(historical_data: pd.DataFrame, venue: str) -> go.Figure:
    """
    Plot the historical accuracy of a specific award venue over time.
    
    Args:
        historical_data: DataFrame with historical Oscar data
        venue: The name of the award venue to analyze
        
    Returns:
        Plotly figure with historical accuracy trend
    """
    # Check if venue column exists
    venue_col = f'{venue}_won'
    if venue_col not in historical_data.columns:
        # Create empty figure with message
        fig = go.Figure()
        fig.add_annotation(
            text=f"No historical data available for {venue}",
            xref="paper", yref="paper",
            x=0.5, y=0.5,
            showarrow=False,
            font=dict(size=14)
        )
        return fig
    
    # Prepare data
    years = historical_data['year'].unique()
    accuracies = []
    
    # Calculate accuracy for each year
    for year in years:
        year_data = historical_data[historical_data['year'] == year]
        
        # Skip years with no data
        if len(year_data) == 0 or year_data[venue_col].sum() == 0:
            continue
        
        # Calculate how often venue winner matches Oscar winner
        matches = year_data[(year_data[venue_col] == True) & 
                          (year_data['is_winner'] == True)]
        
        venue_winners = year_data[year_data[venue_col] == True]
        
        if len(venue_winners) > 0:
            accuracy = len(matches) / len(venue_winners) * 100
            accuracies.append({'Year': year, 'Accuracy': accuracy})
    
    # Convert to DataFrame
    accuracy_df = pd.DataFrame(accuracies)
    
    if accuracy_df.empty:
        # Create empty figure with message
        fig = go.Figure()
        fig.add_annotation(
            text=f"No accuracy data available for {venue}",
            xref="paper", yref="paper",
            x=0.5, y=0.5,
            showarrow=False,
            font=dict(size=14)
        )
        return fig
    
    # Create the figure
    fig = px.line(
        accuracy_df,
        x='Year',
        y='Accuracy',
        title=f'Historical Accuracy Trend: {venue}',
        labels={'Accuracy': 'Prediction Accuracy (%)'},
        markers=True
    )
    
    # Add trendline
    fig.add_trace(
        px.scatter(
            accuracy_df, 
            x='Year', 
            y='Accuracy',
            trendline='ols'
        ).data[1]
    )
    
    # Update layout
    fig.update_layout(
        font=dict(size=12),
        margin=dict(t=80, b=50, l=50, r=50),
        yaxis=dict(range=[0, 100])
    )
    
    # Add horizontal line at 50% for reference
    fig.add_shape(
        type='line',
        x0=min(accuracy_df['Year']),
        x1=max(accuracy_df['Year']),
        y0=50,
        y1=50,
        line=dict(
            color='red',
            width=1,
            dash='dash'
        )
    )
    
    return fig
