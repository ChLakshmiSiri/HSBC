// // const mysql = require("mysql2");
// // const dotenv = require("dotenv");
// // dotenv.config();

// // const connection = mysql.createConnection({
// //   host: process.env.DB_HOST,
// //   user: process.env.DB_USER,
// //   password: process.env.DB_PASSWORD,
// //   database: process.env.DB_NAME,
// // });

// // connection.connect((err) => {
// //   if (err) {
// //     console.error("DB Connection failed:", err);
// //     return;
// //   }
// //   console.log("Connected to MySQL DB ✅");
// // });

// // module.exports = connection;






// // Instead of this:
// // const mysql = require('mysql2');

// Do this:
const mysql = require('mysql2/promise');

// Create a promise-based connection:
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = db;

// const mysql = require("mysql2");
// const dotenv = require("dotenv");
// dotenv.config();

// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// connection.connect((err) => {
//   if (err) {
//     console.error("DB Connection failed:", err);
//     return;
//   }
//   console.log("Connected to MySQL DB ✅");
// });

// module.exports = connection;

