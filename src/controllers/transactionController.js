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

  // GET /api/transactions
  async getTransactions(req, res) {
    try {
      const [rows] = await this.db.query('SELECT * FROM transactions');
      res.json(rows);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // GET /api/transactions/:id
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

  // POST /api/transactions
  async createTransaction(req, res) {
    const { ticker_symbol, type, quantity, price } = req.body;
    try {
      await this.db.query(
        'INSERT INTO transactions (ticker_symbol, type, quantity, price) VALUES (?, ?, ?, ?)',
        [ticker_symbol, type, quantity, price]
      );
      res.json({ message: 'Transaction created successfully' });
    } catch (error) {
      console.error('Error creating transaction:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // PUT /api/transactions/:id
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

  // DELETE /api/transactions/:id
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
