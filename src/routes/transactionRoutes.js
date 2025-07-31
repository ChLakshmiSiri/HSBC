// routes/transactionRoutes.js

const { Router } = require('express');
const transactionController = require('../controllers/transactionController');
const router = Router();

function setTransactionRoutes(app) {
  app.use('/api/transactions', router);

  router.get('/', transactionController.getTransactions.bind(transactionController));
  router.get('/:id', transactionController.getTransactionById.bind(transactionController));
  router.post('/', transactionController.createTransaction.bind(transactionController));
  router.put('/:id', transactionController.updateTransaction.bind(transactionController));
  router.delete('/:id', transactionController.deleteTransaction.bind(transactionController));
}

module.exports = setTransactionRoutes;
