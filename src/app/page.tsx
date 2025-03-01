'use client';

import React from 'react';

export default function Home() {
  return (
    <div style={{ 
      backgroundColor: '#1e2638', 
      color: 'white',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <header style={{ 
        backgroundColor: '#8A3FFC', 
        padding: '1rem',
        textAlign: 'center'
      }}>
        <h1 style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Predictive</h1>
        <p>Oscar Predictions 2025</p>
      </header>
      
      <main style={{ 
        flex: '1',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div style={{ 
          backgroundColor: '#2a3548',
          padding: '1.5rem',
          borderRadius: '0.5rem',
          width: '100%',
          maxWidth: '600px',
          marginBottom: '2rem'
        }}>
          <h2 style={{ 
            fontSize: '1.25rem', 
            fontWeight: '600',
            marginBottom: '1rem',
            color: '#ffffff'
          }}>Best Picture</h2>
          <div style={{ 
            backgroundColor: '#3a4560',
            padding: '1rem',
            borderRadius: '0.375rem',
            marginBottom: '1rem'
          }}>
            <h3 style={{ color: '#ffffff' }}>Dune: Part Two</h3>
            <p style={{ color: '#a0aec0', fontSize: '0.875rem' }}>Likelihood: 82%</p>
          </div>
        </div>
      </main>
      
      <footer style={{ 
        backgroundColor: '#8A3FFC',
        padding: '1rem',
        textAlign: 'center'
      }}>
        <p>Predictive © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}