const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
}).promise();

db.connect()
  .then(() => {
    console.log('Connected to database with thread ID:', db.threadId);
  })
  .catch((err) => {
    console.error('Error connecting to database:', err);
  });

module.exports = db;
