function validateProduct(req, res, next) {
  const products = req.body;
  const result = products.some((product) => !product.productId);
  if (result) return res.status(400).json({ message: '"productId" is required' });
  next();
}

function validateQuantity(req, res, next) {
  const products = req.body;
  const quantityExist = products.every((product) => product.quantity || product.quantity === 0);
  if (!quantityExist) return res.status(400).json({ message: '"quantity" is required' });
  const lowQuantity = products.some((product) => product.quantity < 1 || product.quantity === 0);
  if (lowQuantity) {
 return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
}
  next();
}
module.exports = { validateProduct, validateQuantity };
