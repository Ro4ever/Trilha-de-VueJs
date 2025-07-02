const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  // Pega o token do cabeçalho de autorização
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ msg: 'Nenhum token fornecido, autorização negada.' });
  }

  const tokenParts = authHeader.split(' ');
  if (tokenParts[0] !== 'Bearer' || !tokenParts[1]) {
    return res.status(401).json({ msg: 'Formato de token inválido. Use Bearer <token>.' });
  }

  const token = tokenParts[1];

  try {
    // Verifica e decodifica o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Adiciona o payload do usuário ao objeto de requisição
    next(); // Continua para a próxima função middleware/rota
  } catch (err) {
    console.error('Erro de autenticação:', err.message);
    res.status(403).json({ msg: 'Token inválido ou expirado.' });
  }
};