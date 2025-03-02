import React from 'react';

const Footer: React.FC = () => {
  return (
    <>
      {/* This div adds a small space before the footer */}
      <div style={{ height: '30px' }}></div>

      {/* Footer with inline styles to avoid CSS conflicts */}
      <footer style={{
        marginTop: '20px',
        paddingTop: '20px', 
        paddingBottom: '20px',
        paddingLeft: '2rem',
        paddingRight: '2rem',
        borderTop: '1px solid #2D3748',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{
            fontSize: '0.7rem', 
            color: '#9E9E9E',
            textAlign: 'center'
          }}>
            © 2025. Built by <a href="https://samir.xyz/ventures" target="_blank" rel="noopener noreferrer" style={{color: '#a0aec0', transition: 'color 0.2s'}} className="hover:text-white">Interspace Ventures</a> and coded with <a href="https://replit.com" target="_blank" rel="noopener noreferrer" style={{color: '#a0aec0', transition: 'color 0.2s'}} className="hover:text-white">Replit</a>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;