const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");

router.get("/", transactionController.getAllTransactions);
router.get("/:id", transactionController.getTransactionById);
router.post("/", transactionController.addTransaction);
router.delete("/:id", transactionController.deleteTransactionById); // ← added this

module.exports = router;
