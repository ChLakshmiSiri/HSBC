const Transaction = require("../models/transactionModel");

exports.getAllTransactions = async (req, res) => {
  try {
    const data = await Transaction.getAllTransactions();
    res.json(data);
  } catch (err) {
    res.status(500).send({ message: "Error fetching transactions", error: err });
  }
};

exports.getTransactionById = async (req, res) => {
  try {
    const data = await Transaction.getTransactionById(req.params.id);
    if (!data) return res.status(404).json({ message: "Transaction not found" });
    res.json(data);
  } catch (err) {
    res.status(500).send({ message: "Error fetching transaction", error: err });
  }
};

exports.addTransaction = async (req, res) => {
  try {
    const result = await Transaction.addTransaction(req.body);
    res.json({ message: "Transaction added!", id: result.insertId });
  } catch (err) {
    res.status(500).send({ message: "Error adding transaction", error: err });
  }
};

exports.deleteTransactionById = async (req, res) => {
  try {
    const result = await Transaction.deleteTransactionById(req.params.id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.json({ message: "Transaction deleted successfully!" });
  } catch (err) {
    res.status(500).send({ message: "Error deleting transaction", error: err });
  }
};
