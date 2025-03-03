const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Oscar Prediction App</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
        h1 { color: #ba8e00; }
        .container { max-width: 800px; margin: 0 auto; }
        .card { border: 1px solid #ddd; padding: 15px; margin-bottom: 15px; border-radius: 5px; }
        .nominee { margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px solid #eee; }
        .winner { font-weight: bold; color: #ba8e00; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Oscar Prediction App</h1>
        <p>Simple placeholder page until we get Next.js working properly</p>
        
        <div class="card">
          <h2>Best Picture</h2>
          <div class="nominee winner">
            <div>Emilia Pérez (85% likelihood)</div>
            <div>Betting odds: 2/5</div>
          </div>
          <div class="nominee">
            <div>Anora (67% likelihood)</div>
            <div>Betting odds: 3/1</div>
          </div>
          <div class="nominee">
            <div>The Substance (55% likelihood)</div>
            <div>Betting odds: 5/1</div>
          </div>
        </div>
        
        <div class="card">
          <h2>Best Director</h2>
          <div class="nominee winner">
            <div>Jacques Audiard (78% likelihood)</div>
            <div>Betting odds: 1/2</div>
          </div>
          <div class="nominee">
            <div>Sean Baker (65% likelihood)</div>
            <div>Betting odds: 3/1</div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `);
});

const PORT = 5000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}/`);
});