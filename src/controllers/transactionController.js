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
      const [rows] = await this.db.query('SELECT * FROM transactions ORDER BY timestamp DESC');
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
    let { ticker_symbol, type, quantity, price } = req.body;
    ticker_symbol = ticker_symbol.toUpperCase();

    try {
      await this.db.query(
        'INSERT INTO transactions (ticker_symbol, type, quantity, price, timestamp) VALUES (?, ?, ?, ?, NOW())',
        [ticker_symbol, type.toUpperCase(), quantity, price]
      );

      const [stocks] = await this.db.query('SELECT * FROM stocks WHERE ticker_symbol = ?', [ticker_symbol]);

      if (stocks.length > 0) {
        let newQty = type === 'BUY'
          ? stocks[0].quantity + quantity
          : stocks[0].quantity - quantity;

        await this.db.query('UPDATE stocks SET quantity = ?, buy_price = ? WHERE ticker_symbol = ?', [newQty, price, ticker_symbol]);
      } else if (type === 'BUY') {
        await this.db.query('INSERT INTO stocks (ticker_symbol, company_name, quantity, buy_price) VALUES (?, ?, ?, ?)', [
          ticker_symbol,
          `${ticker_symbol} Inc.`,
          quantity,
          price
        ]);
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
