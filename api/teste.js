const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const API_TOKEN = process.env.API_TOKEN;
  const CLAN_TAG = encodeURIComponent('#2LV0GVR80');

  const response = await fetch(`https://api.clashofclans.com/v1/clans/${CLAN_TAG}/members`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`
    }
  });

  const text = await response.text();
  res.status(response.status).send(text);
};