const express = require("express");
// import express from "express";
const router = express.Router();
const buyController = require("../controllers/buyController");

// import buyController from "../controllers/buyController.js";


router.put('/buy', buyController.buyStock);
// router.put('/buy/:ticker', stockController.buyStock);


module.exports = router;
// export default router;
