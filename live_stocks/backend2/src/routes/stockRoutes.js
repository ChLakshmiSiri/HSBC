const express = require("express");
const router = express.Router();
const stockController = require("../controllers/stockController");

router.get("/", stockController.getAllStocks);
router.get("/:id", stockController.getStockById);
router.post("/", stockController.addStock);

module.exports = router;
