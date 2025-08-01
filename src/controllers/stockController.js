const { connectToDatabase } = require('../config/database');

class StockController {
  constructor() {
    this.initDB();
  }

  async initDB() {
    this.db = await connectToDatabase();
    console.log('StockController DB connected.');
  }

  async getStocks(req, res) {
    try {
      const [rows] = await this.db.execute('SELECT * FROM stocks');
      res.json(rows);
    } catch (error) {
      console.error('Error fetching stocks:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getStockById(req, res) {
    const { id } = req.params;
    try {
      const [rows] = await this.db.execute('SELECT * FROM stocks WHERE id = ?', [id]);
      if (rows.length === 0) return res.status(404).json({ error: 'Stock not found' });
      res.json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async createStock(req, res) {
    const { ticker_symbol, company_name, quantity, buy_price, notes } = req.body;
    try {
      await this.db.execute(
        'INSERT INTO stocks (ticker_symbol, company_name, quantity, buy_price, notes) VALUES (?, ?, ?, ?, ?)',
        [ticker_symbol, company_name, quantity, buy_price, notes]
      );
      res.json({ message: 'Stock created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error creating stock' });
    }
  }

  async updateStock(req, res) {
    const { id } = req.params;
    const { ticker_symbol, company_name, quantity, buy_price, notes } = req.body;

    try {
      const [result] = await this.db.execute(
        'UPDATE stocks SET ticker_symbol = ?, company_name = ?, quantity = ?, buy_price = ?, notes = ? WHERE id = ?',
        [ticker_symbol, company_name, quantity, buy_price, notes, id]
      );
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Stock not found' });
      res.json({ message: 'Stock updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error updating stock' });
    }
  }

  async deleteStock(req, res) {
    const { id } = req.params;
    try {
      const [result] = await this.db.execute('DELETE FROM stocks WHERE id = ?', [id]);
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Stock not found' });
      res.json({ message: 'Stock deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting stock' });
    }
  }

  // NEW: Handle transaction and update stocks accordingly
  async handleTransaction(req, res) {
    const { ticker_symbol, type, quantity, price } = req.body;
    try {
      // Add transaction
      await this.db.execute(
        'INSERT INTO transactions (ticker_symbol, type, quantity, price) VALUES (?, ?, ?, ?)',
        [ticker_symbol, type.toUpperCase(), quantity, price]
      );

      // Get stock
      const [existing] = await this.db.execute(
        'SELECT * FROM stocks WHERE ticker_symbol = ?',
        [ticker_symbol]
      );

      if (existing.length > 0) {
        const currentQty = existing[0].quantity;
        const newQty = type.toUpperCase() === 'BUY'
          ? currentQty + quantity
          : currentQty - quantity;

        await this.db.execute(
          'UPDATE stocks SET quantity = ? WHERE ticker_symbol = ?',
          [newQty, ticker_symbol]
        );
      } else if (type.toUpperCase() === 'BUY') {
        await this.db.execute(
          'INSERT INTO stocks (ticker_symbol, company_name, quantity, buy_price) VALUES (?, ?, ?, ?)',
          [ticker_symbol, ticker_symbol + ' Inc.', quantity, price]
        );
      }

      res.json({ message: 'Transaction processed successfully' });
    } catch (error) {
      console.error('Transaction failed:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = new StockController();
