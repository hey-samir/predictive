import React from 'react';

const AboutSection: React.FC = () => {
  // Define styles directly in component to avoid conflicts
  const purpleColor = '#8A3FFC';
  const cardBgColor = '#2a3548';
  const borderColor = '#4a5568';

  // Card style
  const cardStyle = {
    backgroundColor: cardBgColor,
    borderRadius: 0,
    padding: '1.25rem 1.75rem',
    marginBottom: '1.25rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    border: `1px solid ${borderColor}`
  };

  // Section header style
  const headerStyle = {
    color: purpleColor,
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    paddingBottom: '0.5rem',
    borderBottom: `1px solid ${borderColor}`
  };
  
  // Table styles
  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse' as const,
    border: `2px solid ${purpleColor}30`,
    overflow: 'hidden'
  };
  
  const tableHeaderStyle = {
    backgroundColor: purpleColor,
    color: 'white',
    textTransform: 'uppercase' as const,
    fontSize: '0.813rem',
    fontWeight: 'bold',
    padding: '0.75rem 1rem',
    textAlign: 'left' as const
  };
  
  const tableHeaderCenterStyle = {
    ...tableHeaderStyle,
    width: '40%',
    textAlign: 'center' as const
  };
  
  // Render a table row with optional highlight
  const renderTableRow = (name: string, description: string, details: string, isHighlighted: boolean = false) => {
    const rowStyle = {
      backgroundColor: isHighlighted ? `${purpleColor}15` : 'transparent',
      borderBottom: `1px solid ${purpleColor}30`
    };
    
    const cellStyle = {
      padding: '0.75rem 1rem',
      fontSize: '0.813rem',
      color: 'white'
    };
    
    const nameStyle = {
      ...cellStyle,
      fontWeight: 'bold',
      color: purpleColor
    };
    
    const centerStyle = {
      ...cellStyle,
      textAlign: 'center' as const
    };
    
    return (
      <tr style={rowStyle}>
        <td style={nameStyle}>{name}</td>
        <td style={centerStyle}>{description}</td>
        <td style={cellStyle}>{details}</td>
      </tr>
    );
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '5rem' }}>
      {/* Page Title */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: purpleColor }}>
          And the Algorithm Goes To...
        </h1>
        <p style={{ fontSize: '1rem', color: '#cbd5e0', maxWidth: '768px', margin: '0 auto' }}>
          <strong>Predictive:film</strong> uses data science to forecast Oscar winners, because even AI loves a good acceptance speech. 🎬
        </p>
      </div>
      
      {/* The Plot */}
      <div style={cardStyle}>
        <h2 style={headerStyle}>The Plot</h2>
        <p style={{ fontSize: '0.813rem', lineHeight: 1.7, color: '#f7fafc' }}>
          We crunch 25+ years of Academy Awards history and precursor awards data through our prediction engine. 
          Think of it as "Moneyball" meets "La La Land" - where statistics take center stage.
        </p>
      </div>
      
      {/* The Screenplay */}
      <div style={cardStyle}>
        <h2 style={headerStyle}>The Screenplay</h2>
        <ul style={{ listStyle: 'none', padding: 0, color: '#f7fafc' }}>
          {[
            'Machine learning model trained on Oscar data (1999-2024)',
            'Real-time betting odds integration',
            'Weighted analysis of precursor awards (BAFTA, Golden Globes, etc.)',
            'Historical accuracy tracking for each award predictor'
          ].map((item, index) => (
            <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem', fontSize: '0.813rem' }}>
              <span style={{ color: purpleColor, marginRight: '0.5rem', fontSize: '1rem', display: 'flex', alignItems: 'center' }}>⭐</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* The Credits */}
      <div style={cardStyle}>
        <h2 style={headerStyle}>The Credits</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Data Source</th>
                <th style={tableHeaderCenterStyle}>What It Tells Us</th>
                <th style={tableHeaderStyle}>Why It Matters</th>
              </tr>
            </thead>
            <tbody>
              {renderTableRow(
                'Academy Awards Database',
                'Historical nominations and wins',
                'Official Oscar records since 1927',
                true
              )}
              {renderTableRow(
                'IMDb Awards Central',
                'Comprehensive awards coverage',
                'Tracks 24 major film awards globally'
              )}
              {renderTableRow(
                'The Numbers',
                'Box office performance',
                'Financial success metrics',
                true
              )}
              {renderTableRow(
                'Variety Awards Circuit',
                'Industry insider coverage',
                'Breaking news and analysis'
              )}
              {renderTableRow(
                'Rotten Tomatoes',
                'Critics\' Metascore',
                'Professional reception and consensus',
                true
              )}
              {renderTableRow(
                'IMDb Ratings',
                'Audience Score',
                'Public opinion and engagement'
              )}
              {renderTableRow(
                'Kalshi',
                'Prediction Markets',
                'Crowd-sourced probability estimates',
                true
              )}
              {renderTableRow(
                'Betting Markets',
                'Real-time Odds',
                'Market-driven likelihood assessments'
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* The Nominations */}
      <div style={cardStyle}>
        <h2 style={headerStyle}>The Nominations</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Category</th>
                <th style={tableHeaderCenterStyle}>What They Do</th>
                <th style={tableHeaderStyle}>Awards</th>
              </tr>
            </thead>
            <tbody>
              {renderTableRow(
                'Makers',
                'The big-picture visionaries',
                'Best Picture, Directing, Animated Feature, Documentary, International Film',
                true
              )}
              {renderTableRow(
                'Performers',
                'The faces on screen',
                'Leading & Supporting Actor/Actress'
              )}
              {renderTableRow(
                'Creators',
                'The storytellers',
                'Original/Adapted Screenplay, Original Score/Song',
                true
              )}
              {renderTableRow(
                'Crafters',
                'The technical wizards',
                'Cinematography, Editing, Production Design, Costume, Makeup, Sound, VFX'
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* The Venues */}
      <div style={cardStyle}>
        <h2 style={headerStyle}>The Venues</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Award Show</th>
                <th style={tableHeaderCenterStyle}>Hosted By</th>
                <th style={tableHeaderStyle}>When It Happens</th>
              </tr>
            </thead>
            <tbody>
              {renderTableRow(
                'Academy Awards (Oscars)',
                'Academy of Motion Picture Arts and Sciences',
                'March',
                true
              )}
              {renderTableRow(
                'Golden Globe Awards',
                'Hollywood Foreign Press Association',
                'January'
              )}
              {renderTableRow(
                'BAFTA Awards',
                'British Academy of Film and Television Arts',
                'February',
                true
              )}
              {renderTableRow(
                'Screen Actors Guild (SAG)',
                'SAG-AFTRA',
                'February'
              )}
              {renderTableRow(
                'Critics Choice Awards',
                'Critics Choice Association',
                'January',
                true
              )}
              {renderTableRow(
                'Directors Guild (DGA)',
                'Directors Guild of America',
                'February'
              )}
              {renderTableRow(
                'Producers Guild (PGA)',
                'Producers Guild of America',
                'February',
                true
              )}
              {renderTableRow(
                'Writers Guild (WGA)',
                'Writers Guild of America',
                'February'
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;