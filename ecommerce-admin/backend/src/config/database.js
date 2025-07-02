const { Sequelize } = require('sequelize');
require('dotenv').config(); // Carrega as variáveis de ambiente

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // Defina como true para ver as queries SQL no console
  }
);

module.exports = sequelize;