const salesModel = require('../models/SalesModels');
const getProducts = require('../models/ProductsModels');

const postSales = async (saleData) => {
  const [result] = await Promise.all(saleData.map(({ productId }) =>
    getProducts.getById(productId)));
  if (result.some((array) => array.length === 0)) {
 const { id } = await salesModel.postSales();
    const sales = await Promise.all(saleData.map(({ productId, quantity }) =>
    salesModel.postSalesProducts({ saleId: id, productId, quantity })));
  return { id, itemsSold: sales };
  }
  throw new Error();
};

module.exports = { postSales };
