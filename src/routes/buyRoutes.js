const express = require("express");
const router = express.Router();
const buyController = require("../controllers/buyController");

router.post("/buy", buyController.buyStock);

module.exports = router;