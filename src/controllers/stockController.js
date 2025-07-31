const { connectToDatabase } = require('../config/database');

class StockController {
  constructor() {
    this.initDB();
  }

  async initDB() {
    this.db = await connectToDatabase();
    console.log('Database connection established successfully.');
  }

  // GET /api/stocks
  async getStocks(req, res) {
    try {
      const [rows] = await this.db.execute('SELECT * FROM stocks');
      res.json(rows);
    } catch (error) {
      console.error('Error fetching stocks:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // POST /api/stocks
  async createStock(req, res) {
    const { ticker_symbol, company_name, quantity, buy_price, notes } = req.body;
    try {
      await this.db.query(
        'INSERT INTO stocks (ticker_symbol, company_name, quantity, buy_price, notes) VALUES (?, ?, ?, ?, ?)',
        [ticker_symbol, company_name, quantity, buy_price, notes]
      );

      await this.db.query(
        'INSERT INTO transactions (ticker_symbol, type, quantity, price) VALUES (?, "BUY", ?, ?)',
        [ticker_symbol, quantity, buy_price]
      );

      res.json({ message: 'Stock created successfully' });
    } catch (error) {
      console.error('Error creating stock:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // DELETE /api/stocks/:id
  async deleteStock(req, res) {
    const { id } = req.params;
    try {
      await this.db.query('DELETE FROM stocks WHERE id = ?', [id]);
      res.json({ message: 'Stock deleted successfully' });
    } catch (error) {
      console.error('Error deleting stock:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = new StockController();
