// const db = require("../config/database");
// // import db from "../config/database.js";

// const getAllTransactions = async () => {
//   const [rows] = await db.query("SELECT * FROM transactions ORDER BY timestamp DESC");
//   return rows;
// };

// const getTransactionById = async (id) => {
//   const [rows] = await db.query("SELECT * FROM transactions WHERE id = ?", [id]);
//   return rows[0];
// };

// const addTransaction = async (transaction) => {
//   const { ticker_symbol, type, quantity, price } = transaction;
//   const [result] = await db.query(
//     "INSERT INTO transactions (ticker_symbol, type, quantity, price) VALUES (?, ?, ?, ?)",
//     [ticker_symbol, type, quantity, price]
//   );
//   return result;
// };

// const deleteTransactionById = async (id) => {
//   const [result] = await db.query("DELETE FROM transactions WHERE id = ?", [id]);
//   return result;
// };

// module.exports = {
//   getAllTransactions,
//   getTransactionById,
//   addTransaction,
//   deleteTransactionById,
// };

// // export default {
// //   getAllTransactions, 
// //   getTransactionById,
// //   addTransaction,
// //   deleteTransactionById
// // };









//const db = require("../config/database");

// const getAllTransactions = async () => {
//   const [rows] = await db.query("SELECT * FROM transactions ORDER BY timestamp DESC");
//   return rows;
// };

// const addTransaction = async ({ ticker_symbol, type, quantity, price }) => {
//   const [result] = await db.query(
//     "INSERT INTO transactions (ticker_symbol, type, quantity, price) VALUES (?, ?, ?, ?)",
//     [ticker_symbol, type, quantity, price]
//   );
//   return result;
// };

// module.exports = {
//   getAllTransactions,
//   addTransaction,
// };
