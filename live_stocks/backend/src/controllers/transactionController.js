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


exports.sellStock = async (req, res) => {
  try {
    const { ticker_symbol, quantity, price } = req.body;

    if (!ticker_symbol || !quantity || !price) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Start transaction
    const connection = await db.getConnection();
    await connection.beginTransaction();

    // Check if stock exists
    const [existingStocks] = await connection.query(
      'SELECT * FROM stocks WHERE ticker_symbol = ?',
      [ticker_symbol]
    );

    if (existingStocks.length === 0) {
      await connection.rollback();
      return res.status(404).json({ error: 'Stock not found in portfolio' });
    }

    const existing = existingStocks[0];

    // Calculate new quantity
    const newQuantity = existing.quantity - quantity;

    if (newQuantity < 0) {
      await connection.rollback();
      return res.status(400).json({ error: 'Not enough quantity to sell' });
    }

    // Insert into transactions
    await connection.query(
      'INSERT INTO transactions (ticker_symbol, type, quantity, price, timestamp) VALUES (?, "SELL", ?, ?, NOW())',
      [ticker_symbol, quantity, price]
    );

    if (newQuantity === 0) {
      // Delete stock if all sold
      await connection.query(
        'DELETE FROM stocks WHERE ticker_symbol = ?',
        [ticker_symbol]
      );
    } else {
      // Update quantity
      await connection.query(
        'UPDATE stocks SET quantity = ?, updated_at = NOW() WHERE ticker_symbol = ?',
        [newQuantity, ticker_symbol]
      );
    }

    await connection.commit();
    connection.release();

    res.status(200).json({ message: 'Stock sold successfully!' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
