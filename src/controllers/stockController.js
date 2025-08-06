// <<<<<<< frontend
// const Stock = require("../models/stockModel");

// exports.getAllStocks = async (req, res) => {
//   try {
//     const data = await Stock.getAllStocks();
//     res.json(data);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// };

// exports.getStockById = async (req, res) => {
//   try {
//     const data = await Stock.getStockById(req.params.id);
//     if (!data) return res.status(404).json({ message: "Stock not found" });
//     res.json(data);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// };

// exports.addStock = async (req, res) => {
//   try {
//     const result = await Stock.addStock(req.body);
//     res.json({ message: "Stock added!", id: result.insertId });
//   } catch (err) {
//     res.status(500).send(err);
//   }
// };

// exports.deleteStockById = async (req, res) => {
//   try {
//     const result = await Stock.deleteStockById(req.params.id);
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "Stock not found" });
// =======
// const { connectToDatabase } = require('../config/database');

// class StockController {
//   constructor() {
//     this.initDB();
//   }

//   async initDB() {
//     this.db = await connectToDatabase();
//     console.log('StockController DB connected.');
//   }

//   async getAllStocks(req, res) {
//     try {
//       const [rows] = await this.db.execute('SELECT * FROM stocks');
//       res.json(rows);
//     } catch (error) {
//       console.error('Error fetching stocks:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   }

//   async getStockById(req, res) {
//     const { id } = req.params;
//     try {
//       const [rows] = await this.db.execute('SELECT * FROM stocks WHERE id = ?', [id]);
//       if (rows.length === 0) return res.status(404).json({ error: 'Stock not found' });
//       res.json(rows[0]);
//     } catch (error) {
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   }

//   async createStock(req, res) {
//     const { ticker_symbol, company_name, quantity, buy_price, notes } = req.body;
//     try {
//       await this.db.execute(
//         'INSERT INTO stocks (ticker_symbol, company_name, quantity, buy_price, notes) VALUES (?, ?, ?, ?, ?)',
//         [ticker_symbol.toUpperCase(), company_name, quantity, buy_price, notes]
//       );
//       res.json({ message: 'Stock created successfully' });
//     } catch (error) {
//       res.status(500).json({ error: 'Error creating stock' });
//     }
//   }

//   async updateStock(req, res) {
//     const { id } = req.params;
//     const { ticker_symbol, company_name, quantity, buy_price, notes } = req.body;

//     try {
//       const [result] = await this.db.execute(
//         'UPDATE stocks SET ticker_symbol = ?, company_name = ?, quantity = ?, buy_price = ?, notes = ? WHERE id = ?',
//         [ticker_symbol.toUpperCase(), company_name, quantity, buy_price, notes, id]
//       );
//       if (result.affectedRows === 0) return res.status(404).json({ error: 'Stock not found' });
//       res.json({ message: 'Stock updated successfully' });
//     } catch (error) {
//       res.status(500).json({ error: 'Error updating stock' });
// >>>>>>> master
//     }
//     res.json({ message: "Stock deleted successfully!" });
//   } catch (err) {
//     res.status(500).send(err);
//   }
// <<<<<<< frontend
// };
// =======

//   async deleteStock(req, res) {
//     const { id } = req.params;
//     try {
//       const [result] = await this.db.execute('DELETE FROM stocks WHERE id = ?', [id]);
//       if (result.affectedRows === 0) return res.status(404).json({ error: 'Stock not found' });
//       res.json({ message: 'Stock deleted successfully' });
//     } catch (error) {
//       res.status(500).json({ error: 'Error deleting stock' });
//     }
//   }

//   async handleTransaction(req, res) {
//     let { ticker_symbol, type, quantity, price } = req.body;
//     ticker_symbol = ticker_symbol.toUpperCase();

//     try {
//       // Insert transaction
//       await this.db.execute(
//         'INSERT INTO transactions (ticker_symbol, type, quantity, price, timestamp) VALUES (?, ?, ?, ?, NOW())',
//         [ticker_symbol, type.toUpperCase(), quantity, price]
//       );

//       // Check if stock exists
//       const [existing] = await this.db.execute(
//         'SELECT * FROM stocks WHERE ticker_symbol = ?',
//         [ticker_symbol]
//       );

//       if (existing.length > 0) {
//         const existingStock = existing[0];
//         let newQty =
//           type.toUpperCase() === 'BUY'
//             ? existingStock.quantity + quantity
//             : existingStock.quantity - quantity;

//         newQty = Math.max(newQty, 0);

//         await this.db.execute(
//           'UPDATE stocks SET quantity = ?, buy_price = ?, updated_at = NOW() WHERE ticker_symbol = ?',
//           [newQty, price, ticker_symbol]
//         );
//       } else if (type.toUpperCase() === 'BUY') {
//         await this.db.execute(
//           'INSERT INTO stocks (ticker_symbol, company_name, quantity, buy_price, current_price, notes, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())',
//           [ticker_symbol, `${ticker_symbol} Inc.`, quantity, price, 0, '']
//         );
//       }

//       res.json({ message: 'Transaction processed successfully' });
//     } catch (error) {
//       console.error('Transaction failed:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   }

//   async getPortfolioValue(req, res) {
//     try {
//       const [rows] = await this.db.execute('SELECT quantity, buy_price FROM stocks');
//       const total = rows.reduce((sum, s) => sum + s.quantity * s.buy_price, 0);
//       res.json({ total_value: total });
//     } catch (error) {
//       console.error('Error calculating portfolio value:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   }
// }

// module.exports = new StockController();
// >>>>>>> master
