const express = require("express");
const router = express.Router();
const txController = require("../controllers/transactionController");

router.get("/", txController.getAllTransactions);
router.post("/", txController.addTransaction);

module.exports = router;
