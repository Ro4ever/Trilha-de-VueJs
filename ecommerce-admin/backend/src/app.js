const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const User = require('./models/User'); // Importe os modelos para sincronizar
const Product = require('./models/Product');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Habilita CORS para permitir requisições do frontend
app.use(express.json()); // Habilita o parsing de JSON para requisições com 'Content-Type: application/json'

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Sincronizar modelos com o banco de dados e iniciar o servidor
sequelize.sync({ force: false }) // 'force: true' apaga e recria as tabelas (use com cautela! Apenas para desenvolvimento inicial)
  .then(() => {
    console.log('Database & tables created/synced!');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('Unable to connect to the database or sync models:', err));

module.exports = app; // Exporta o app para testes ou outras utilizações