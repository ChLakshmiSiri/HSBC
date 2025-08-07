const express = require("express");
// import express from "express";
const router = express.Router();
const buyController = require("../controllers/buyController");

// import buyController from "../controllers/buyController.js";

router.post("/buy", buyController.buyStock);

module.exports = router;
// export default router;
