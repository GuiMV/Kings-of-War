const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const API_TOKEN = process.env.API_TOKEN;
  const CLAN_TAG = encodeURIComponent('#2LV0GVR80');
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
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};