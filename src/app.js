// const express = require('express');
// const { connectToDatabase } = require('./config/database');
// const setRoutes = require('./routes/stockRoutes');
// const setTransactionRoutes = require('./routes/transactionRoutes');

// const app = express();
// const PORT = process.env.PORT || 3000;
// app.use(express.json());
//setRoutes(app);
//     setTransactionRoutes(app);
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });

// // connectToDatabase()
// //   .then(() => {
// //     console.log('Connected to the database successfully');
// //     setRoutes(app);
// //     setTransactionRoutes(app);
// //     app.listen(PORT, () => {
// //       console.log(`Server is running on port ${PORT}`);
// //     });
// //   })
// //   .catch((error) => {
// //     console.error('Error connecting to the database:', error);
// //   });
const express = require('express');
const path = require('path');
const { connectToDatabase } = require('./config/database');
const setStockRoutes = require('./routes/stockRoutes');
const setTransactionRoutes = require('./routes/transactionRoutes');

const app = express();
const PORT = process.env.PORT || 3019;

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, '..', 'public')));

// API routes
setStockRoutes(app);
setTransactionRoutes(app);

// Connect to database and start server
connectToDatabase()
  .then(() => {
    console.log('Connected to the database successfully');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Frontend available at http://localhost:${PORT}/LandingPage.html`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
