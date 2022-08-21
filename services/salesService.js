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
  const sale = await salesModel.getSalesById(id);
  if (!sale) throw new Error();
  return sale;
};

const deleteSale = async (id) => {
  await salesModel.deleteSale(id);
};

module.exports = { postSales, getAllSales, getSalesById, deleteSale };
