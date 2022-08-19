const noName = { message: '"name" is required' };
const invalidName = { message: '"name" length must be at least 5 characters long' };

function validateName(req, res, next) {
  const { name } = req.body;
  if (!name) return res.status(400).json(noName);
  if (name.length < 5) return res.status(422).json(invalidName);
  next();
}

module.exports = { validateName };
