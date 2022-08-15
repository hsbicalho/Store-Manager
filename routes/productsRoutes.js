const express = require('express');
const ProductsController = require('../controllers/productsController');

const productsRouter = express.Router();

productsRouter.get('/', ProductsController.getAll);

productsRouter.post('/', ProductsController.postProduct);

productsRouter.get('/:id', ProductsController.getById);

module.exports = productsRouter;
