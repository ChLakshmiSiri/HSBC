const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const stockRoutes = require("./routes/stockRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

app.use("/api/stocks", stockRoutes);
app.use("/api/transactions", transactionRoutes);

module.exports = app;
