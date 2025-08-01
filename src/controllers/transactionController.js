// controllers/transactionController.js
const { connectToDatabase } = require('../config/database');

class TransactionController {
  constructor() {
    this.initDB();
  }

  async initDB() {
    this.db = await connectToDatabase();
    console.log('TransactionController DB connection established.');
  }

  async getTransactions(req, res) {
    try {
      const [rows] = await this.db.query('SELECT * FROM transactions');
      res.json(rows);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getTransactionById(req, res) {
    const { id } = req.params;
    try {
      const [rows] = await this.db.query('SELECT * FROM transactions WHERE id = ?', [id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Transaction not found' });
      }
      res.json(rows[0]);
    } catch (error) {
      console.error('Error fetching transaction:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async createTransaction(req, res) {
    const { ticker_symbol, type, quantity, price } = req.body;
    try {
      const timestamp = new Date();
      await this.db.query(
        'INSERT INTO transactions (ticker_symbol, type, quantity, price, timestamp) VALUES (?, ?, ?, ?, ?)',
        [ticker_symbol, type, quantity, price, timestamp]
      );

      const [rows] = await this.db.query('SELECT * FROM stocks WHERE ticker_symbol = ?', [ticker_symbol]);

      if (rows.length > 0) {
        let updatedQuantity = rows[0].quantity;
        if (type.toUpperCase() === 'BUY') {
          updatedQuantity += quantity;
        } else if (type.toUpperCase() === 'SELL') {
          updatedQuantity -= quantity;
        }
        await this.db.query('UPDATE stocks SET quantity = ? WHERE ticker_symbol = ?', [updatedQuantity, ticker_symbol]);
      } else if (type.toUpperCase() === 'BUY') {
        await this.db.query('INSERT INTO stocks (ticker_symbol, quantity) VALUES (?, ?)', [ticker_symbol, quantity]);
      }

      res.json({ message: 'Transaction created and stock updated successfully' });
    } catch (error) {
      console.error('Error creating transaction:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async updateTransaction(req, res) {
    const { id } = req.params;
    const { ticker_symbol, type, quantity, price } = req.body;
    try {
      const [result] = await this.db.query(
        'UPDATE transactions SET ticker_symbol = ?, type = ?, quantity = ?, price = ? WHERE id = ?',
        [ticker_symbol, type, quantity, price, id]
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Transaction not found' });
      }
      res.json({ message: 'Transaction updated successfully' });
    } catch (error) {
      console.error('Error updating transaction:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deleteTransaction(req, res) {
    const { id } = req.params;
    try {
      const [result] = await this.db.query('DELETE FROM transactions WHERE id = ?', [id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Transaction not found' });
      }
      res.json({ message: 'Transaction deleted successfully' });
    } catch (error) {
      console.error('Error deleting transaction:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = new TransactionController();
