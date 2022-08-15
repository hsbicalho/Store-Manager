const ProductsService = require('../services/productsService');

const getAll = async (req, res) => {
  const products = await ProductsService.getAll();
  res.status(200).json(products);
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductsService.getById(id);
    return res.status(200).json(product[0]);
  } catch (error) {
    return res.status(404).json({ message: 'Product not found' });
  }
};

const postProduct = async (req, res) => {
  const { name } = req.body;
  const product = await ProductsService.postProduct(name);
  return res.status(201).json(product);
};

module.exports = { getAll, getById, postProduct };
