// api/clan.js
const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const API_TOKEN = process.env.API_TOKEN;
  const CLAN_TAG = encodeURIComponent('#2LV0GVR80');

  if (!API_TOKEN) {
    return res.status(500).json({ error: 'Token da API não está configurado' });
  }

  try {
    const response = await fetch(`https://api.clashofclans.com/v1/clans/${CLAN_TAG}/members`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Erro ao buscar membros do clã' });
    }

    const data = await response.json();
    res.status(200).json(data); // retorna os membros
  } catch (err) {
    res.status(500).json({ error: 'Erro interno ao buscar o clã' });
  }
};