// const express = require("express");
// // import cors from "cors";
// // import dotenv from "dotenv";
// // import express from "express";
// const cors = require("cors");
// const dotenv = require("dotenv");
// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const stockRoutes = require("./routes/stockRoutes");
// // import transactionRoutes from "./routes/transactionRoutes.js";
// // import stockRoutes from "./routes/stockRoutes.js";

// const transactionRoutes = require("./routes/transactionRoutes");

// const buyRoutes = require("./routes/buyRoutes");

// app.use("/api", stockRoutes);
// app.use("/api/transactions", transactionRoutes);

// app.use("/api", buyRoutes);


// module.exports = app;

// // export default app;






// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const stockRoutes = require("./routes/stockRoutes");
// const transactionRoutes = require("./routes/transactionRoutes");
// const buyRoutes = require("./routes/buyRoutes");
// const buyRoutes = require("./routes/buyRoutes");


// app.use("/api", buyRoutes);


// app.use("/api/stocks", stockRoutes);
// app.use("/api/transactions", transactionRoutes);
// app.use("/api", buyRoutes);


// // const app = require("./src/app");
// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on http://localhost:${PORT}`);
// });

// module.exports = app;






const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const stockRoutes = require("./routes/stockRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const buyRoutes = require("./routes/buyRoutes");

// Routes
app.use("/api/stocks", stockRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api", buyRoutes); // includes /buy

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

module.exports = app;
