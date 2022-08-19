const express = require('express');
const salesController = require('../controllers/salesController');
const salesMiddleware = require('../middlewares/validateSales');

const productsRouter = express.Router();

productsRouter.post('/', salesMiddleware.validateProduct,
  salesMiddleware.validateQuantity,
  salesController.postSales);

module.exports = productsRouter;
