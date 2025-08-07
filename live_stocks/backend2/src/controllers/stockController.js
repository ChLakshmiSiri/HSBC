const Stock = require("../models/stockModel");

exports.getAllStocks = (req, res) => {
  Stock.getAllStocks((err, data) => {
    if (err) return res.status(500).send(err);
    res.json(data);
  });
};

exports.getStockById = (req, res) => {
  Stock.getStockById(req.params.id, (err, data) => {
    if (err) return res.status(500).send(err);
    res.json(data[0]);
  });
};

exports.addStock = (req, res) => {
  Stock.addStock(req.body, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Stock added!", id: result.insertId });
  });
};
