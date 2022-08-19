const salesService = require('../services/salesService');

const postSales = async (req, res) => {
  try {
    const product = await salesService.postSales(req.body);
  return res.status(201).json(product);
  } catch (error) {
    return res.status(404).json({ message: 'Product not found' });
  }
};

module.exports = { postSales };
