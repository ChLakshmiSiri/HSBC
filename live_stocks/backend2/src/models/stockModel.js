const db = require("../config/database");

const getAllStocks = (callback) => {
  db.query("SELECT * FROM stocks", callback);
};

const getStockById = (id, callback) => {
  db.query("SELECT * FROM stocks WHERE id = ?", [id], callback);
};

const addStock = (stock, callback) => {
  const { ticker_symbol, company_name, quantity, buy_price, current_price, notes } = stock;
  db.query(
    "INSERT INTO stocks (ticker_symbol, company_name, quantity, buy_price, current_price, notes) VALUES (?, ?, ?, ?, ?, ?)",
    [ticker_symbol, company_name, quantity, buy_price, current_price, notes],
    callback
  );
};

module.exports = { getAllStocks, getStockById, addStock };
