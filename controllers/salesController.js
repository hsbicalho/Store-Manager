const salesService = require('../services/salesService');

const postSales = async (req, res) => {
  try {
    const product = await salesService.postSales(req.body);
  return res.status(201).json(product);
  } catch (error) {
    return res.status(404).json({ message: 'Product not found' });
  }
};

const getAllSales = async (_req, res) => {
  const sales = await salesService.getAllSales();
  res.status(200).json(sales);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  const sales = await salesService.getSalesById(id);
  if (!sales) return res.status(404).json({ message: 'Sale not found' });
  return res.status(200).json(sales);
};

module.exports = { postSales, getAllSales, getSalesById };
