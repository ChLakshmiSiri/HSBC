const { Router } = require('express');
const stockController = require('../controllers/stockController');
const router = Router();

function setRoutes(app) {
  app.use('/api/stocks', router);
  router.get('/', stockController.getStocks.bind(stockController));
  router.get('/:id', stockController.getStockById.bind(stockController));
  router.post('/', stockController.createStock.bind(stockController));
  router.put('/:id', stockController.updateStock.bind(stockController));
  router.delete('/:id', stockController.deleteStock.bind(stockController));

  // New: Process transaction
  router.post('/process-transaction', stockController.handleTransaction.bind(stockController));
}

module.exports = setRoutes;
