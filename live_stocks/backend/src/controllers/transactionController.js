// const Transaction = require("../models/transactionModel");

// // import Transaction from "../models/transactionModel.js";

// exports.getAllTransactions = async (req, res) => {
//   try {
//     const data = await Transaction.getAllTransactions();
//     res.json(data);
//   } catch (err) {
//     res.status(500).send({ message: "Error fetching transactions", error: err });
//   }
// };

// exports.getTransactionById = async (req, res) => {
//   try {
//     const data = await Transaction.getTransactionById(req.params.id);
//     if (!data) return res.status(404).json({ message: "Transaction not found" });
//     res.json(data);
//   } catch (err) {
//     res.status(500).send({ message: "Error fetching transaction", error: err });
//   }
// };

// exports.addTransaction = async (req, res) => {
//   try {
//     const result = await Transaction.addTransaction(req.body);
//     res.json({ message: "Transaction added!", id: result.insertId });
//   } catch (err) {
//     res.status(500).send({ message: "Error adding transaction", error: err });
//   }
// };

// exports.deleteTransactionById = async (req, res) => {
//   try {
//     const result = await Transaction.deleteTransactionById(req.params.id);
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "Transaction not found" });
//     }
//     res.json({ message: "Transaction deleted successfully!" });
//   } catch (err) {
//     res.status(500).send({ message: "Error deleting transaction", error: err });
//   }
// };


// // export default {
// //   getAllTransactions, 
// //   getTransactionById,
// //   addTransaction,
// //   deleteTransactionById
// // };






// const Transaction = require("../models/transactionModel");

// const getAllTransactions = async (req, res) => {
//   try {
//     const data = await Transaction.getAllTransactions();
//     res.json(data);
//   } catch (err) {
//     res.status(500).send({ message: "Error fetching transactions", error: err });
//   }
// };

// const getTransactionById = async (req, res) => {
//   try {
//     const data = await Transaction.getTransactionById(req.params.id);
//     if (!data) return res.status(404).json({ message: "Transaction not found" });
//     res.json(data);
//   } catch (err) {
//     res.status(500).send({ message: "Error fetching transaction", error: err });
//   }
// };

// const addTransaction = async (req, res) => {
//   try {
//     const result = await Transaction.addTransaction(req.body);
//     res.json({ message: "Transaction added!", id: result.insertId });
//   } catch (err) {
//     res.status(500).send({ message: "Error adding transaction", error: err });
//   }
// };

// const deleteTransactionById = async (req, res) => {
//   try {
//     const result = await Transaction.deleteTransactionById(req.params.id);
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "Transaction not found" });
//     }
//     res.json({ message: "Transaction deleted successfully!" });
//   } catch (err) {
//     res.status(500).send({ message: "Error deleting transaction", error: err });
//   }
// };

// module.exports = {
//   getAllTransactions,
//   getTransactionById,
//   addTransaction,
//   deleteTransactionById,
// };




// const Transaction = require("../models/transactionModel");

// const getAllTransactions = async (req, res) => {
//   try {
//     const data = await Transaction.getAllTransactions();
//     res.json(data);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching transactions", error: err.message });
//   }
// };

// const addTransaction = async (req, res) => {
//   try {
//     const result = await Transaction.addTransaction(req.body);
//     res.status(201).json({ message: "Transaction recorded!", id: result.insertId });
//   } catch (err) {
//     res.status(500).json({ message: "Error adding transaction", error: err.message });
//   }
// };

// module.exports = {
//   getAllTransactions,
//   addTransaction,
// };


const db = require('../config/database');

exports.getAllTransactions = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM transactions ORDER BY timestamp DESC');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching transactions:', err);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};
