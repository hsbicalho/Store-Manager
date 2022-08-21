const express = require('express');
const salesController = require('../controllers/salesController');
const salesMiddleware = require('../middlewares/validateSales');

const salesRouter = express.Router();

salesRouter.post('/', salesMiddleware.validateProduct,
  salesMiddleware.validateQuantity,
  salesController.postSales);

salesRouter.get('/', salesController.getAllSales);

salesRouter.get('/:id', salesController.getSalesById);

salesRouter.delete('/:id', salesController.deleteSale);

module.exports = salesRouter;
