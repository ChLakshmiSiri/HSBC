const Tx = require("../models/transactionModel");

exports.getAllTransactions = (req, res) => {
  Tx.getAllTransactions((err, data) => {
    if (err) return res.status(500).send(err);
    res.json(data);
  });
};

exports.addTransaction = (req, res) => {
  Tx.addTransaction(req.body, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Transaction added!", id: result.insertId });
  });
};
