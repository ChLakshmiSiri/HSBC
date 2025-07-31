const mysql = require('mysql2/promise');

const connectToDatabase = async () => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'n3u3da!',
    database: 'project'
  });
  return connection;
};

module.exports = { connectToDatabase };
