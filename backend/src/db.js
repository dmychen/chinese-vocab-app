const mysql = require('mysql2/promise');
require('dotenv').config({ path: '../../.env' });

// create a connection pool
// TODO: MOVE INFO TO .ENV
const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'dmdmmlad',
    database: 'vocab_app',
    waitForConnections: true,
    connectionLimit: 10,
    port: 3306
});
  
// all models access one pool, without creating unnecessary connections
module.exports = pool;