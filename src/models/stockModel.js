const db = require("../config/database");

const getAllStocks = async () => {
  const [rows] = await db.query("SELECT * FROM stocks");
  return rows;
};

const getStockById = async (id) => {
  const [rows] = await db.query("SELECT * FROM stocks WHERE id = ?", [id]);
  return rows[0];
};

const addStock = async (stock) => {
  const { ticker_symbol, company_name, quantity, buy_price, current_price, notes } = stock;
  const [result] = await db.query(
    "INSERT INTO stocks (ticker_symbol, company_name, quantity, buy_price, current_price, notes) VALUES (?, ?, ?, ?, ?, ?)",
    [ticker_symbol, company_name, quantity, buy_price, current_price, notes]
  );
  return result;
};

const deleteStockById = async (id) => {
  const [result] = await db.query("DELETE FROM stocks WHERE id = ?", [id]);
  return result;
};

module.exports = {
  getAllStocks,
  getStockById,
  addStock,
  deleteStockById,
};
