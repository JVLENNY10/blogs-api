const { decoder } = require('../helpers/jwtHelpers');
const blogPostsService = require('../services/blogPostsService');
const categoriesService = require('../services/categoriesService');

const checkById = async (req, res, next) => {
  const { id } = req.params;
  const blogPost = await blogPostsService.getById(id);

  if (blogPost === null) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  next();
};

const checkCategoryIds = async (req, res, next) => {
  const { categoryIds } = req.body;
  const categories = await categoriesService.getAll();

  if (categoryIds === undefined) {
    return res.status(400).json({ message: '"categoryIds" is required' });
  }

  const categoryIdsAreValid = categories.some((category) => categoryIds.includes(category.id));

  if (!categoryIdsAreValid) {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }

  next();
};

const checkCategoryIdsInUpdate = async (req, res, next) => {
  const { categoryIds } = req.body;

  if (categoryIds !== undefined) {
    return res.status(400).json({ message: 'Categories cannot be edited' });
  }

  next();
};

const checkContent = async (req, res, next) => {
  const { content } = req.body;

  if (content === undefined) {
    return res.status(400).json({ message: '"content" is required' });
  }

  next();
};

const checkTitle = async (req, res, next) => {
  const { title } = req.body;

  if (title === undefined) {
    return res.status(400).json({ message: '"title" is required' });
  }

  next();
};

const checkUserId = async (req, res, next) => {
  const { id } = req.params;
  const token = req.headers.authorization;

  const loggedInUserId = decoder(token).data.id;
  const { userId } = await blogPostsService.getById(id);

  if (loggedInUserId !== userId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  next();
};

module.exports = {
  checkById,
  checkCategoryIds,
  checkCategoryIdsInUpdate,
  checkContent,
  checkTitle,
  checkUserId,
};
