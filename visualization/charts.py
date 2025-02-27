import pandas as pd
import plotly.graph_objects as go
import plotly.express as px
from typing import List, Dict, Any, Optional, Tuple

def plot_prediction_comparison(predictions: pd.DataFrame) -> go.Figure:
    """
    Create a visual comparison of model predictions vs. betting odds and predictive markets.
    
    Args:
        predictions: DataFrame with predictions and market data
        
    Returns:
        Plotly figure with comparison
    """
    if predictions.empty:
        # Return empty figure if no data
        return go.Figure()
    
    # Sort by model likelihood
    sorted_data = predictions.sort_values('Model Likelihood', ascending=False)
    
    # Get categories to plot
    categories = sorted_data['Award Category'].unique().tolist()
    
    # Create figure
    fig = go.Figure()
    
    # Ensure we have all columns
    if 'Betting Odds' not in sorted_data.columns:
        sorted_data['Betting Odds'] = 0
    
    if 'Predictive Markets' not in sorted_data.columns:
        sorted_data['Predictive Markets'] = 0
    
    # Add traces for each data source
    for category in categories:
        category_data = sorted_data[sorted_data['Award Category'] == category]
        
        # Add trace for model predictions
        fig.add_trace(go.Bar(
            x=category_data['Nominee Name'],
            y=category_data['Model Likelihood'],
            name=f'Model - {category}',
            text=category_data['Model Likelihood'].round(1),
            textposition='auto',
            marker_color='#9C27B0',  # Purple
            customdata=category_data[['Film Title', 'Award Category', 'Awards Venue Support']],
            hovertemplate='<b>%{x}</b><br>' +
                          'Film: %{customdata[0]}<br>' +
                          'Category: %{customdata[1]}<br>' +
                          'Model Likelihood: %{y:.1f}%<br>' +
                          'Supporting Venues: %{customdata[2]}<br>' +
                          '<extra></extra>'
        ))
        
        # Add trace for betting odds
        if 'Betting Odds' in category_data.columns and category_data['Betting Odds'].max() > 0:
            fig.add_trace(go.Bar(
                x=category_data['Nominee Name'],
                y=category_data['Betting Odds'],
                name=f'Betting Odds - {category}',
                text=category_data['Betting Odds'].round(1),
                textposition='auto',
                marker_color='#03A9F4',  # Blue
                visible='legendonly',  # Hide by default to simplify view
                customdata=category_data[['Film Title', 'Award Category']],
                hovertemplate='<b>%{x}</b><br>' +
                              'Film: %{customdata[0]}<br>' +
                              'Category: %{customdata[1]}<br>' +
                              'Betting Odds: %{y:.1f}%<br>' +
                              '<extra></extra>'
            ))
        
        # Add trace for predictive markets
        if 'Predictive Markets' in category_data.columns and category_data['Predictive Markets'].max() > 0:
            fig.add_trace(go.Bar(
                x=category_data['Nominee Name'],
                y=category_data['Predictive Markets'],
                name=f'Predictive Markets - {category}',
                text=category_data['Predictive Markets'].round(1),
                textposition='auto',
                marker_color='#FF5722',  # Orange
                visible='legendonly',  # Hide by default to simplify view
                customdata=category_data[['Film Title', 'Award Category']],
                hovertemplate='<b>%{x}</b><br>' +
                              'Film: %{customdata[0]}<br>' +
                              'Category: %{customdata[1]}<br>' +
                              'Predictive Markets: %{y:.1f}%<br>' +
                              '<extra></extra>'
            ))
    
    # Update layout
    fig.update_layout(
        title='Oscar Predictions Comparison',
        xaxis_title='Nominee',
        yaxis_title='Likelihood (%)',
        barmode='group',
        legend_title='Data Source',
        height=600,
        margin=dict(l=50, r=50, t=80, b=80),
        template="plotly_white"
    )
    
    # Add category dropdown
    buttons = []
    for i, category in enumerate(categories):
        # Find all traces for this category (model, betting, market)
        visible = [True if cat == category else False for cat in categories for _ in range(3)]
        
        # Add button for this category
        buttons.append(dict(
            label=category,
            method="update",
            args=[{"visible": visible},
                  {"title": f"Oscar Predictions: {category}"}]
        ))
    
    # Add dropdown menu
    fig.update_layout(
        updatemenus=[dict(
            active=0,
            buttons=buttons,
            direction="down",
            pad={"r": 10, "t": 10},
            showactive=True,
            x=0.05,
            xanchor="left",
            y=1.15,
            yanchor="top"
        )]
    )
    
    # Add annotation for category selection
    fig.update_layout(
        annotations=[dict(
            text="Select Category:",
            x=0,
            y=1.12,
            showarrow=False,
            xref="paper",
            yref="paper",
            xanchor="left",
            yanchor="bottom",
            font=dict(size=14)
        )]
    )
    
    return fig

def plot_venue_strength(venue_strength: pd.DataFrame) -> go.Figure:
    """
    Create a visual representation of award venue predictive strength.
    
    Args:
        venue_strength: DataFrame with venue predictive strength analysis
        
    Returns:
        Plotly figure with venue strength visualization
    """
    if venue_strength.empty:
        # Return empty figure if no data
        return go.Figure()
    
    # Melt the DataFrame to get a long format for plotting
    data_columns = [col for col in venue_strength.columns if col != 'Award Category']
    
    if not data_columns:
        return go.Figure()
    
    long_data = pd.melt(
        venue_strength, 
        id_vars=['Award Category'],
        value_vars=data_columns,
        var_name='Award Venue',
        value_name='Predictive Strength'
    )
    
    # Create heatmap
    fig = px.density_heatmap(
        long_data,
        x='Award Venue',
        y='Award Category',
        z='Predictive Strength',
        title='Award Venues Predictive Strength by Category',
        labels={'Predictive Strength': 'Strength (%)'},
        color_continuous_scale='Viridis'
    )
    
    # Add text annotations
    fig.update_traces(
        text=long_data['Predictive Strength'].round(1).astype(str) + '%',
        texttemplate='%{text}',
        textfont={'size': 10}
    )
    
    # Update layout
    fig.update_layout(
        height=800,
        margin=dict(l=50, r=50, t=80, b=50),
        coloraxis_colorbar=dict(title='Strength (%)'),
        template="plotly_white"
    )
    
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
    if historical_data.empty:
        # Return empty figure if no data
        return go.Figure()
    
    # Check if venue column exists
    venue_col = f"{venue}_won"
    if venue_col not in historical_data.columns:
        # Return empty figure if venue not in data
        return go.Figure()
    
    # Group by year and calculate accuracy
    yearly_accuracy = []
    
    for year in historical_data['year'].unique():
        year_data = historical_data[historical_data['year'] == year]
        
        # Calculate how often the venue's winners matched Oscar winners
        matches = sum((year_data[venue_col] == True) & (year_data['won_oscar'] == True))
        total_categories = len(year_data['category'].unique())
        
        if total_categories > 0:
            accuracy = (matches / total_categories) * 100
        else:
            accuracy = 0
        
        yearly_accuracy.append({
            'Year': year,
            'Accuracy': accuracy
        })
    
    # Convert to DataFrame
    accuracy_df = pd.DataFrame(yearly_accuracy)
    
    # Create line chart
    fig = px.line(
        accuracy_df,
        x='Year',
        y='Accuracy',
        title=f'Historical Predictive Accuracy: {venue}',
        labels={'Accuracy': 'Accuracy (%)'},
        markers=True
    )
    
    # Add a trend line
    fig.add_trace(go.Scatter(
        x=accuracy_df['Year'],
        y=accuracy_df['Accuracy'].rolling(window=3, min_periods=1).mean(),
        mode='lines',
        name='3-Year Rolling Average',
        line=dict(color='red', dash='dash')
    ))
    
    # Update layout
    fig.update_layout(
        yaxis=dict(range=[0, 100]),
        height=500,
        margin=dict(l=50, r=50, t=80, b=50),
        legend=dict(
            orientation="h",
            yanchor="bottom",
            y=1.02,
            xanchor="right",
            x=1
        ),
        template="plotly_white"
    )
    
    return fig