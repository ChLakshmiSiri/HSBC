const db = require("../config/database");

const getAllTransactions = (callback) => {
  db.query("SELECT * FROM transactions ORDER BY timestamp DESC", callback);
};

const addTransaction = (tx, callback) => {
  const { ticker_symbol, type, quantity, price } = tx;
  db.query(
    "INSERT INTO transactions (ticker_symbol, type, quantity, price) VALUES (?, ?, ?, ?)",
    [ticker_symbol, type, quantity, price],
    callback
  );
};

module.exports = { getAllTransactions, addTransaction };
