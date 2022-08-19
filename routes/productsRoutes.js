const express = require('express');
const ProductsController = require('../controllers/productsController');
const validateProduct = require('../middlewares/validateProduct');

const productsRouter = express.Router();

productsRouter.get('/', ProductsController.getAll);

productsRouter.post('/', validateProduct.validateName, ProductsController.postProduct);

productsRouter.get('/:id', ProductsController.getById);

module.exports = productsRouter;
