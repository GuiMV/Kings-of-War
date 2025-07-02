const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = 3000;

const API_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjEzMjU4NTNmLTdmYjgtNGJkOC1hZWQ1LTJiMzM5YWVjNDVkMyIsImlhdCI6MTc1MTQ2MTQ2OSwic3ViIjoiZGV2ZWxvcGVyLzJkM2Q0ZDM5LWNlNTUtNTE0MC0yNWM1LWQxMWViZDI4N2NjYSIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjQ1LjYuMzcuODkiXSwidHlwZSI6ImNsaWVudCJ9XX0.5LQr3cC6tmSQYI40x6_Nbu3C_2S3JhfW-bdM1y06v6D-NVZldEYKPDwR7pUfBYRbuxfggZGF6PZyjGah22Ciog';
const CLAN_TAG = encodeURIComponent('#2LV0GVR80');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/clan', async (req, res) => {
  const url = `https://api.clashofclans.com/v1/clans/${CLAN_TAG}/members`;
  
  try {
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${API_TOKEN}`
        }
    });

    if (!response.ok) {
        return res.status(response.status).json({ error: 'Erro ao buscar dados do clã' });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});