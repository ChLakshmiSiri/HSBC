const db = require('../config/database');


// import Stock from '../models/stockModel.js';
// import db from "../config/database.js";

exports.buyStock = async (req, res) => {
  const {
    ticker_symbol,
    company_name,
    buy_price,
    current_price,
    quantity,
    notes
  } = req.body;

  console.log("📥 Request received:", {
    ticker_symbol,
    company_name,
    buy_price,
    current_price,
    quantity,
    notes
  });

  try {
    // Insert into transactions
    await db.query(
      'INSERT INTO transactions (ticker_symbol, type, quantity, price, timestamp) VALUES (?, ?, ?, ?, NOW())',
      [ticker_symbol, 'BUY', quantity, buy_price]
    );

    // Check if stock exists
    const [existing] = await db.query(
      'SELECT * FROM stocks WHERE ticker_symbol = ?',
      [ticker_symbol]
    );

    if (existing.length > 0) {
      // Update stock quantity and latest buy price
      await db.query(
        'UPDATE stocks SET quantity = quantity + ?, buy_price = ?, current_price = ?, updated_at = NOW() WHERE ticker_symbol = ?',
        [quantity, buy_price, current_price, ticker_symbol]
      );
    } else {
      // Insert new stock
      await db.query(
        'INSERT INTO stocks (ticker_symbol, company_name, quantity, buy_price, current_price, notes, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())',
        [ticker_symbol, company_name, quantity, buy_price, current_price, notes]
      );
    }

    res.status(200).json({ message: 'Stock bought successfully' });
  } catch (err) {
    console.error("❌ Error in buyStock:", err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
