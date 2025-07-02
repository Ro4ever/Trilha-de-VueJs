const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Verifica se o usuário já existe
    let user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ msg: 'Usuário com este email já existe.' });
    }

    // Cria o novo usuário (a senha será hasheada pelo hook do modelo)
    user = await User.create({ username, email, password });

    // Payload para o JWT
    const payload = {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };

    // Gera o token JWT
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' }, // Token expira em 1 hora
      (err, token) => {
        if (err) throw err;
        res.json({ token }); // Retorna o token
      }
    );
  } catch (err) {
    console.error('Erro no registro:', err.message);
    res.status(500).send('Erro no servidor. Por favor, tente novamente.');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Busca o usuário pelo email
    let user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ msg: 'Credenciais inválidas.' });
    }

    // Compara a senha fornecida com a senha hasheada no banco de dados
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciais inválidas.' });
    }

    // Payload para o JWT
    const payload = {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };

    // Gera o token JWT
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token }); // Retorna o token
      }
    );
  } catch (err) {
    console.error('Erro no login:', err.message);
    res.status(500).send('Erro no servidor. Por favor, tente novamente.');
  }
};