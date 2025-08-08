// // import Stock from "../models/stockModel.js";
// const stock = require("../models/stockModel.js");
// const db = require("../config/database.js");

// // import db from "../config/database.js";


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
//     }
//     res.json({ message: "Stock deleted successfully!" });
//   } catch (err) {
//     res.status(500).send(err);
//   }
// };





// exports.getGroupedStocks = async (req, res) => {
//   try {
//     const [rows] = await db.query(`
//       SELECT 
//         ticker_symbol, 
//         company_name, 
//         SUM(quantity) AS total_quantity,
//         ROUND(AVG(buy_price), 2) AS avg_buy_price,
//         ROUND(AVG(current_price), 2) AS current_price
//       FROM stocks
//       GROUP BY ticker_symbol, company_name
//     `);
//     res.json(rows);
//   } catch (error) {
//     console.error("Error in getGroupedStocks:", error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// exports.getStockSummary = async (req, res) => {
//   try {
//     const [rows] = await db.query(`
//       SELECT 
//         SUM(CASE WHEN type = 'BUY' THEN price * quantity ELSE 0 END) AS totalSpent,
//         SUM(CASE WHEN type = 'SELL' THEN price * quantity ELSE 0 END) AS totalEarned
//       FROM transactions
//     `);

//     const { totalSpent, totalEarned } = rows[0] || { totalSpent: 0, totalEarned: 0 };

//     res.json({
//       totalSpent: totalSpent || 0,
//       totalEarned: totalEarned || 0
//     });
//   } catch (error) {
//     console.error("Error in getStockSummary:", error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// const sellStock = async (req, res) => {
//   const { ticker_symbol, quantity, price } = req.body;

//   try {
//     // Find existing stock
//     const [existing] = await db.execute(
//       'SELECT * FROM stocks WHERE ticker_symbol = ?',
//       [ticker_symbol]
//     );

//     if (existing.length === 0) {
//       return res.status(404).json({ message: 'Stock not found' });
//     }

//     const currentStock = existing[0];

//     if (currentStock.quantity < quantity) {
//       return res.status(400).json({ message: 'Not enough stocks to sell' });
//     }

//     const newQty = currentStock.quantity - quantity;

//     if (newQty === 0) {
//       await db.execute('DELETE FROM stocks WHERE ticker_symbol = ?', [ticker_symbol]);
//     } else {
//       await db.execute('UPDATE stocks SET quantity = ? WHERE ticker_symbol = ?', [
//         newQty,
//         ticker_symbol,
//       ]);
//     }

//     await db.execute(
//       'INSERT INTO transactions (ticker_symbol, type, quantity, price, timestamp) VALUES (?, "SELL", ?, ?, NOW())',
//       [ticker_symbol, quantity, price]
//     );

//     res.json({ message: 'Stock sold successfully' });
//   } catch (error) {
//     console.error('Error selling stock:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };


// module.exports = {
//   getAllStocks,
//   getStockById,
//   addStock,
//   deleteStockById,
//   getGroupedStocks,
//   getStockSummary,
//   sellStock
// };






const Stock = require("../models/stockModel.js");
const db = require("../config/database.js");


const stockModel = require("../models/stockModel");

const getAllStocks = async (req, res) => {
  try {
    const stocks = await stockModel.getAllStocks();

    if (!stocks || stocks.length === 0) {
      return res.status(404).json({ message: "No stocks found" });
    }

    res.status(200).json(stocks);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { getAllStocks };







// const getAllStocks = async (req, res) => {
//   try {
//     const data = await Stock.getAllStocks();
//     res.json(data);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// };

const getStockById = async (req, res) => {
  try {
    const data = await Stock.getStockById(req.params.id);
    if (!data) return res.status(404).json({ message: "Stock not found" });
    res.json(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

const addStock = async (req, res) => {
  try {
    const result = await Stock.addStock(req.body);
    res.json({ message: "Stock added!", id: result.insertId });
  } catch (err) {
    res.status(500).send(err);
  }
};

const deleteStockById = async (req, res) => {
  try {
    const result = await Stock.deleteStockById(req.params.id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Stock not found" });
    }
    res.json({ message: "Stock deleted successfully!" });
  } catch (err) {
    res.status(500).send(err);
  }
};

const getGroupedStocks = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        ticker_symbol, 
        company_name, 
        SUM(quantity) AS total_quantity,
        ROUND(AVG(buy_price), 2) AS avg_buy_price,
        ROUND(AVG(current_price), 2) AS current_price
      FROM stocks
      GROUP BY ticker_symbol, company_name
    `);
    res.json(rows);
  } catch (error) {
    console.error("Error in getGroupedStocks:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getStockSummary = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        SUM(CASE WHEN type = 'BUY' THEN price * quantity ELSE 0 END) AS totalSpent,
        SUM(CASE WHEN type = 'SELL' THEN price * quantity ELSE 0 END) AS totalEarned
      FROM transactions
    `);

    const { totalSpent, totalEarned } = rows[0] || { totalSpent: 0, totalEarned: 0 };

    res.json({
      totalSpent: totalSpent || 0,
      totalEarned: totalEarned || 0
    });
  } catch (error) {
    console.error("Error in getStockSummary:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const sellStock = async (req, res) => {
  const { ticker_symbol, quantity, price } = req.body;

  try {
    const [existing] = await db.execute(
      'SELECT * FROM stocks WHERE ticker_symbol = ?',
      [ticker_symbol]
    );

    if (existing.length === 0) {
      return res.status(404).json({ message: 'Stock not found' });
    }

    const currentStock = existing[0];

    if (currentStock.quantity < quantity) {
      return res.status(400).json({ message: 'Not enough stocks to sell' });
    }

    const newQty = currentStock.quantity - quantity;

    if (newQty === 0) {
      await db.execute('DELETE FROM stocks WHERE ticker_symbol = ?', [ticker_symbol]);
    } else {
      await db.execute('UPDATE stocks SET quantity = ? WHERE ticker_symbol = ?', [
        newQty,
        ticker_symbol,
      ]);
    }

    await db.execute(
      'INSERT INTO transactions (ticker_symbol, type, quantity, price, timestamp) VALUES (?, "SELL", ?, ?, NOW())',
      [ticker_symbol, quantity, price]
    );

    res.json({ message: 'Stock sold successfully' });
  } catch (error) {
    console.error('Error selling stock:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




// Final export
module.exports = {
  getAllStocks,
  getStockById,
  addStock,
  deleteStockById,
  getGroupedStocks,
  getStockSummary,
  sellStock
};
