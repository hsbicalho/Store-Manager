const salesModel = require('../models/SalesModels');
/* const getProducts = require('../models/ProductsModels'); */
const { getById } = require('./productsService');

const postSales = async (saleData) => {
  await Promise.all(saleData.map(({ productId }) => getById(productId)));

 const { id } = await salesModel.postSales();
    const sales = await Promise.all(saleData.map(({ productId, quantity }) =>
    salesModel.postSalesProducts({ saleId: id, productId, quantity })));
  return { id, itemsSold: sales };
};

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();
  return sales;
};

const getSalesById = async (id) => {
  const sale = salesModel.getSalesById(id);
  return sale;
};

/* const postSales = async (saleData) => {
  const [result] = await Promise.all(saleData.map(({ productId }) =>
    getProducts.getById(productId)));
  if (result.some((array) => array.length === 0)) {
 const { id } = await salesModel.postSales();
    const sales = await Promise.all(saleData.map(({ productId, quantity }) =>
    salesModel.postSalesProducts({ saleId: id, productId, quantity })));
  return { id, itemsSold: sales };
  }
  throw new Error();
}; */

module.exports = { postSales, getAllSales, getSalesById };
