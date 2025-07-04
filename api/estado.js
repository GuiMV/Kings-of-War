// api/estado.js

let estado = {}; // objeto em memória

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    return res.status(200).json(estado);
  }

  if (req.method === 'POST') {
    const { tag, ativo } = req.body;
    if (typeof tag === 'string' && typeof ativo === 'boolean') {
      estado[tag] = ativo;
      return res.status(200).json({ ok: true });
    }
    return res.status(400).json({ error: 'Dados inválidos' });
  }

  res.status(405).json({ error: 'Método não permitido' });
};