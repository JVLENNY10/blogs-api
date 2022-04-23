const servicesToGet = require('../services/servicesToGet');

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

module.exports = { getCategories, getUserById, getUsers };
