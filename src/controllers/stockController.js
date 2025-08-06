const Stock = require("../models/stockModel");

exports.getAllStocks = async (req, res) => {
  try {
    const data = await Stock.getAllStocks();
    res.json(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getStockById = async (req, res) => {
  try {
    const data = await Stock.getStockById(req.params.id);
    if (!data) return res.status(404).json({ message: "Stock not found" });
    res.json(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.addStock = async (req, res) => {
  try {
    const result = await Stock.addStock(req.body);
    res.json({ message: "Stock added!", id: result.insertId });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.deleteStockById = async (req, res) => {
  try {
    const result = await Stock.deleteStockById(req.params.id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Stock not found" });
    }
    res.json({ message: "Stock deleted successfully!" });
  } catch (err) {
    res.status(500).send(err);
  }
};
