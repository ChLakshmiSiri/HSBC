const { Router } = require('express');
const stockController = require('../controllers/stockController');
const router = Router();

function setRoutes(app) {
  app.use('/api/stocks', router);

  router.get('/', stockController.getStocks.bind(stockController));         // GET all stocks
  router.get('/:id', stockController.getStockById.bind(stockController));   // 👈 GET stock by ID
  router.post('/', stockController.createStock.bind(stockController));      // POST new stock
  router.delete('/:id', stockController.deleteStock.bind(stockController)); // DELETE stock
  // You can also add PUT for update
}

module.exports = setRoutes;

