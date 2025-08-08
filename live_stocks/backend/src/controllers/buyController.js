// const db = require('../config/database');

// exports.buyStock = async (req, res) => {
//   const { ticker_symbol } = req.params;
//   const { company_name, quantity, buy_price, current_price, notes } = req.body;

//   try {
//     // 1. Check if stock exists
//     const [existingRows] = await db.query(
//       'SELECT * FROM stocks WHERE ticker_symbol = ?',
//       [ticker_symbol]
//     );

//     if (existingRows.length > 0) {
//       // 🧮 Update the stock: new avg buy price and total quantity
//       const stock = existingRows[0];
//       const totalQty = stock.quantity + quantity;
//       const totalInvested = (stock.buy_price * stock.quantity) + (buy_price * quantity);
//       const avgBuyPrice = totalInvested / totalQty;

//       await db.query(
//         `UPDATE stocks 
//          SET quantity = ?, buy_price = ?, current_price = ?, notes = ?, updated_at = NOW() 
//          WHERE ticker_symbol = ?`,
//         [
//           totalQty,
//           avgBuyPrice,
//           current_price,
//           notes || stock.notes,
//           ticker_symbol
//         ]
//       );
//     } else {
//       // 🆕 Insert new stock
//       await db.query(
//         `INSERT INTO stocks 
//          (ticker_symbol, company_name, quantity, buy_price, current_price, notes, created_at, updated_at) 
//          VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
//         [
//           ticker_symbol,
//           company_name || null,
//           quantity,
//           buy_price,
//           current_price,
//           notes || null
//         ]
//       );
//     }

//     // 🧾 Log BUY transaction
//     await db.query(
//       `INSERT INTO transactions 
//        (ticker_symbol, type, quantity, price, timestamp) 
//        VALUES (?, 'BUY', ?, ?, NOW())`,
//       [ticker_symbol, quantity, buy_price]
//     );

//     res.status(200).json({ message: "Snagged successfully and logged transaction." });

//   } catch (err) {
//     console.error("Error in buyStock:", err);
//     res.status(500).json({ error: "Failed to buy stock." });
//   }
// };


const db = require('../config/database');

// PUT /api/buy
exports.buyStock = async (req, res) => {
  try {
    const {
      ticker_symbol,
      company_name = "",
      quantity,
      price,
      notes = ""
    } = req.body;

    if (!ticker_symbol || !price || !quantity) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const timestamp = new Date();

    const [existing] = await db.query(
      'SELECT * FROM stocks WHERE ticker_symbol = ?',
      [ticker_symbol]
    );

    if (existing.length > 0) {
      const currentStock = existing[0];
      const newQuantity = currentStock.quantity + quantity;

      const newBuyPrice = (
        (currentStock.quantity * currentStock.buy_price + quantity * price) /
        newQuantity
      ).toFixed(2);

      await db.query(
        'UPDATE stocks SET quantity = ?, buy_price = ?, updated_at = ? WHERE ticker_symbol = ?',
        [newQuantity, newBuyPrice, timestamp, ticker_symbol]
      );
    } else {
      await db.query(
        'INSERT INTO stocks (ticker_symbol, company_name, quantity, buy_price, current_price, notes, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [
          ticker_symbol,
          company_name,
          quantity,
          price,
          price,
          notes,
          timestamp,
          timestamp
        ]
      );
    }

    await db.query(
      'INSERT INTO transactions (ticker_symbol, type, quantity, price, timestamp) VALUES (?, "BUY", ?, ?, ?)',
      [ticker_symbol, quantity, price, timestamp]
    );

    res.status(200).json({ message: "Buy operation successful" });
  } catch (error) {
    console.error("Buy error:", error);
    res.status(500).json({ error: "Failed to perform buy operation" });
  }
};
