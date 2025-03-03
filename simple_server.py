import http.server
import socketserver
import os

PORT = 5000

# Create public directory if it doesn't exist
if not os.path.exists('public'):
    os.makedirs('public')

# Create index.html file if it doesn't exist
if not os.path.exists('public/index.html'):
    with open('public/index.html', 'w') as f:
        f.write("""<!DOCTYPE html>
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
        <p>This is a demonstration version of the Oscar Predictions app.</p>
        <p>Current status: Running with minimal dependencies on simplified configuration.</p>
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
</html>""")

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory='public', **kwargs)

    def log_message(self, format, *args):
        print(f"[{self.log_date_time_string()}] {format % args}")

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept')
        super().end_headers()

print(f"Starting server on port {PORT}...")
print(f"Serving content from {os.path.abspath('public')}")

httpd = socketserver.TCPServer(("0.0.0.0", PORT), CustomHandler)
try:
    httpd.serve_forever()
except KeyboardInterrupt:
    print("\nServer stopped.")
    httpd.server_close()