const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5000;
const PUBLIC_DIR = path.join(__dirname, 'public');

// Ensure public directory exists
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

// Create the index.html file if it doesn't exist
const indexPath = path.join(PUBLIC_DIR, 'index.html');
if (!fs.existsSync(indexPath)) {
  const htmlContent = `<!DOCTYPE html>
<html>
<head>
    <title>Oscar Predictions | Predictive.film</title>
    <style>
        :root {
          --app-background: #1e2638;
          --app-card: #2a3548;
          --app-purple: #8A3FFC;
          --app-text-primary: #ffffff;
          --app-text-secondary: #a0aec0;
        }
        
        body { 
            font-family: -apple-system, BlinkMacSystemFont, sans-serif; 
            max-width: 1200px; 
            margin: 0 auto; 
            padding: 20px;
            background-color: var(--app-background);
            color: var(--app-text-primary);
        }
        
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 40px;
        }
        
        .logo {
            font-size: 24px;
            font-weight: bold;
            color: var(--app-purple);
        }
        
        .nav {
            display: flex;
            gap: 20px;
        }
        
        .nav-item {
            color: var(--app-text-secondary);
            cursor: pointer;
            text-transform: uppercase;
            font-size: 14px;
            letter-spacing: 1px;
        }
        
        .nav-item.active {
            color: var(--app-text-primary);
            position: relative;
        }
        
        .nav-item.active::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: var(--app-purple);
        }
        
        .section {
            margin-bottom: 60px;
        }
        
        .section-title {
            font-size: 32px;
            margin-bottom: 20px;
            color: var(--app-text-primary);
        }
        
        .section-description {
            font-size: 16px;
            color: var(--app-text-secondary);
            margin-bottom: 30px;
            max-width: 800px;
            line-height: 1.6;
        }
        
        .card-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 20px;
        }
        
        .card {
            background-color: var(--app-card);
            border-radius: 8px;
            padding: 20px;
            transition: transform 0.2s;
            border: 1px solid rgba(138, 63, 252, 0.15);
        }
        
        .card:hover {
            transform: translateY(-5px);
            border-color: var(--app-purple);
        }
        
        .card-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
            text-align: center;
        }
        
        .card-subtitle {
            font-size: 14px;
            color: var(--app-text-secondary);
            margin-bottom: 15px;
            text-align: center;
            font-style: italic;
        }
        
        .probability {
            font-size: 24px;
            color: var(--app-purple);
            font-weight: bold;
            text-align: center;
            margin: 15px 0;
        }
        
        .message {
            background-color: var(--app-card);
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            border-left: 4px solid var(--app-purple);
        }
        
        .footer {
            margin-top: 60px;
            padding-top: 20px;
            border-top: 1px solid var(--app-card);
            color: var(--app-text-secondary);
            font-size: 14px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">Predictive.film</div>
        <div class="nav">
            <div class="nav-item active">Predictions</div>
            <div class="nav-item">Visualizations</div>
            <div class="nav-item">About</div>
        </div>
    </div>
    
    <div class="message">
        <p>This is a simplified version of the Oscar Predictions app using a basic HTTP server.</p>
    </div>
    
    <div class="section">
        <h2 class="section-title">2025 Oscar Predictions</h2>
        <p class="section-description">Using historical data, other award winners, and betting odds to predict who will win at the Academy Awards.</p>
        
        <div class="card-grid">
            <div class="card">
                <div class="card-title">Best Picture</div>
                <div class="card-subtitle">Oppenheimer</div>
                <div class="probability">83%</div>
            </div>
            
            <div class="card">
                <div class="card-title">Best Director</div>
                <div class="card-subtitle">Christopher Nolan</div>
                <div class="probability">78%</div>
            </div>
            
            <div class="card">
                <div class="card-title">Best Actor</div>
                <div class="card-subtitle">Cillian Murphy</div>
                <div class="probability">91%</div>
            </div>
            
            <div class="card">
                <div class="card-title">Best Actress</div>
                <div class="card-subtitle">Lily Gladstone</div>
                <div class="probability">68%</div>
            </div>
        </div>
    </div>
    
    <div class="footer">
        &copy; 2025 Predictive.film | Oscar predictions made using machine learning
    </div>
</body>
</html>`;
  
  fs.writeFileSync(indexPath, htmlContent);
}

const server = http.createServer((req, res) => {
  try {
    console.log(`Request: ${req.method} ${req.url}`);
    
    // Default to index.html
    let filePath = path.join(PUBLIC_DIR, req.url === '/' ? 'index.html' : req.url);
    
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const contentType = getContentType(filePath);
      const content = fs.readFileSync(filePath);
      
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    } else {
      // Return 404
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 Not Found</h1>');
    }
  } catch (err) {
    console.error('Server error:', err);
    res.writeHead(500, { 'Content-Type': 'text/html' });
    res.end(`<h1>500 Internal Server Error</h1><p>${err.message}</p>`);
  }
});

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const types = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.json': 'application/json'
  };
  
  return types[ext] || 'text/plain';
}

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}/`);
  console.log(`Serving content from ${PUBLIC_DIR}`);
});