const servicesToGet = require('../services/servicesToGet');

const checkBlogPostInformations = async (req, res, next) => {
  const { categoryIds, content, title } = req.body;
  const categories = await servicesToGet.getCategories();

  const categoryIdsAreValid = categories.every((category) => (
    categoryIds.some((id) => id === category.id)
  ));

  if (categoryIds === undefined) {
    return res.status(400).json({ message: '"categoryIds" is required' });
  }

  if (content === undefined) {
    return res.status(400).json({ message: '"content" is required' });
  }

  if (title === undefined) {
    return res.status(400).json({ message: '"title" is required' });
  }

  if (!categoryIdsAreValid) {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }

  next();
};

module.exports = checkBlogPostInformations;
