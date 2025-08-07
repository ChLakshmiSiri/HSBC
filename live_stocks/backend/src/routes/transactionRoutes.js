// const express = require("express");
// // import express from "express";
// const router = express.Router();
// const transactionController = require("../controllers/transactionController");
// // import transactionController from "../controllers/transactionController.js";

// router.get("/", transactionController.getAllTransactions);
// router.get("/:id", transactionController.getTransactionById);
// router.post("/", transactionController.addTransaction);
// router.delete("/:id", transactionController.deleteTransactionById); // ← added this

// module.exports = router;
// // export default router;



// const express = require("express");
// const router = express.Router();
// const transactionController = require("../controllers/transactionController");

// router.get("/", transactionController.getAllTransactions);
// router.get("/:id", transactionController.getTransactionById);
// router.post("/", transactionController.addTransaction);
// router.delete("/:id", transactionController.deleteTransactionById);

// module.exports = router;



// const express = require("express");
// const router = express.Router();
// const transactionsController = require("../controllers/transactionController");

// router.get("/", transactionsController.getAllTransactions);
// router.post("/", transactionsController.addTransaction);

// module.exports = router;


const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.get('/', transactionController.getAllTransactions);

module.exports = router;
