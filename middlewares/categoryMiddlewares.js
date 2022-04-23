const checkCategoryName = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(404).json({ message: '"name" is required' });
  }

  next();
};

module.exports = checkCategoryName;
