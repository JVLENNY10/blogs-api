const jwt = require('jsonwebtoken');
const servicesToGet = require('../services/servicesToGet');

const getBlogPosts = async (req, res) => {
  const results = [];
  const token = req.headers.authorization;
  const userId = jwt.decode(token).data.id;
  const user = await servicesToGet.getUserById(userId);
  const blogPosts = await servicesToGet.getBlogPosts();
  const categories = await servicesToGet.getCategories();

  blogPosts.forEach((test) => {
    const { id, title, content, published, updated } = test;
    results.push({ id, title, content, userId, published, updated, user, categories });
  });

  return res.status(200).json(results);
};

const getCategories = async (_req, res) => {
  const categories = await servicesToGet.getCategories();
  return res.status(200).json(categories);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await servicesToGet.getUserById(id);
  return res.status(200).json(user);
};

const getUsers = async (_req, res) => {
  const users = await servicesToGet.getUsers();
  return res.status(200).json(users);
};

module.exports = { getBlogPosts, getCategories, getUserById, getUsers };
