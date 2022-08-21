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

const deleteSale = async (saleId) => {
  await salesModel.deleteSale(saleId);
};
const updateSale = async (saleId, itemsUpdated) => {
  const saleExist = await salesModel.getSalesById(saleId);
  if (!saleExist) return null;
  await Promise.all(itemsUpdated.map(({ productId }) => getById(productId)));
  Promise.all(itemsUpdated.map(async ({ quantity, productId }) => {
    await salesModel.updateSale(saleId, quantity, productId);
  }));
  return { data: { saleId, itemsUpdated } };
};
module.exports = {
  postSales,
  getAllSales,
  getSalesById,
  deleteSale,
  updateSale,
};
