const { Category, User } = require('../sequelize/models');

const getCategories = async () => {
  const categories = await Category.findAll();
  return categories;
};

const getCategoryById = async (id) => {
  const category = await Category.findOne({ where: { id } });
  return category;
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const getUserById = async (id) => {
  const user = await User.findOne({ attributes: { exclude: ['password'] }, where: { id } });
  return user;
};

const getUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return users;
};

module.exports = { getCategories, getCategoryById, getUserByEmail, getUserById, getUsers };
