const salesModel = require('../models/SalesModels');
const getProducts = require('../models/ProductsModels');

const postSales = async (saleData) => {
  const product = await saleData.map(({ productId }) => getProducts.getById(productId));
  if (product.length === 0) throw new Error();
  const { id } = await salesModel.postSales();
  console.log(id);
    const sales = await Promise.all(saleData.map(({ productId, quantity }) =>
    salesModel.postSalesProducts({ saleId: id, productId, quantity })));
  return { id, itemsSold: sales };
};

module.exports = { postSales };
