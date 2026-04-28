const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

pool.connect()
  .then(() => console.log('Connecte a PostgreSQL avec succes'))
  .catch(err => console.error('Erreur de connexion PostgreSQL :', err.message));

module.exports = pool;