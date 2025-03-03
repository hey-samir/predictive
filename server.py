import http.server
import socketserver
import os

# Create public directory if needed
if not os.path.exists('public'):
    os.makedirs('public')

# Create a simple HTML file
with open('public/index.html', 'w') as f:
    f.write("""<!DOCTYPE html>
<html>
<head>
    <title>Oscar Predictions 2025</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #1e293b;
            color: #f8fafc;
        }
        .header {
            text-align: center;
            padding: 20px 0;
            border-bottom: 1px solid #334155;
        }
        .prediction {
            background-color: #334155;
            border-radius: 8px;
            padding: 15px;
            margin: 10px 0;
        }
        h1 { color: #8b5cf6; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Oscar Predictions 2025</h1>
        <p>Simple version of the Oscar prediction application</p>
    </div>

    <div class="prediction">
        <h2>Best Picture</h2>
        <p>Predicted winner: <strong>Oppenheimer</strong> (83%)</p>
    </div>

    <div class="prediction">
        <h2>Best Actor</h2>
        <p>Predicted winner: <strong>Cillian Murphy</strong> (91%)</p>
    </div>

    <div class="prediction">
        <h2>Best Actress</h2>
        <p>Predicted winner: <strong>Lily Gladstone</strong> (68%)</p>
    </div>
</body>
</html>""")

PORT = 5000
Handler = http.server.SimpleHTTPRequestHandler
Handler.extensions_map.update({
    '.html': 'text/html',
})

# Set the directory to serve files from
os.chdir('public')

with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd:
    print(f"Serving simplified Oscar predictions app at http://0.0.0.0:{PORT}")
    httpd.serve_forever()