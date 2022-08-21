const ProductsModel = require('../models/ProductsModels');

const getAll = async () => {
  const products = await ProductsModel.getAll();
  return products;
};
const getById = async (id) => {
  const product = await ProductsModel.getById(id);
  if (product.length === 0) throw new Error();
  return product;
};

const postProduct = async (name) => {
  const product = await ProductsModel.postProduct(name);
  if (product.length === 0) throw new Error();
  return product;
};
const updateProduct = async (name, id) => {
  const updatedProduct = await ProductsModel.updateProduct(name, id);
  return updatedProduct;
};
module.exports = { getAll, getById, postProduct, updateProduct };
