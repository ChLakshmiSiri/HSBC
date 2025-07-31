const { Router } = require('express');
const stockController = require('../controllers/stockController');
const router = Router();

function setRoutes(app) {
  app.use('/api/stocks', router);

  router.get('/', stockController.getStocks.bind(stockController));
  router.post('/', stockController.createStock.bind(stockController));
  router.delete('/:id', stockController.deleteStock.bind(stockController));
}

module.exports = setRoutes;
