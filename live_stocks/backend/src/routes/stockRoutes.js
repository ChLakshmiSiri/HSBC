// import { sellStock } from '../controllers/stockController.js';
const sellStock = require('../controllers/stockController.js').sellStock;

const express = require("express");
// import express from "express";
const router = express.Router();
const stockController = require("../controllers/stockController");
// import stockController from "../controllers/stockController.js";

router.get("/", stockController.getAllStocks);
router.get("/:id", stockController.getStockById);
router.post("/", stockController.addStock);
router.delete("/:id", stockController.deleteStockById);


router.get('/stocks/grouped', stockController.getGroupedStocks);
router.get('/portfolio/summary', stockController.getStockSummary);

router.post('/sell', sellStock);



module.exports = router;
// export default router;

