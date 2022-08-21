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
  try {
    const { id } = req.params;
    const sales = await salesService.getSalesById(id);
    return res.status(200).json(sales);
  } catch (error) {
    return res.status(404).json({ message: 'Sale not found' });
  }
};

const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;
    await salesService.getSalesById(id);
    await salesService.deleteSale(id);
    return res.status(204).send();
  } catch (error) {
    return res.status(404).json({ message: 'Sale not found' });
  }
};

module.exports = { postSales, getAllSales, getSalesById, deleteSale };
