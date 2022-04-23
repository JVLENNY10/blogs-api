const { Category, User } = require('../sequelize/models');

const getCategories = async () => {
  const category = await Category.findAll();
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
  const user = await User.findAll({ attributes: { exclude: ['password'] } });
  return user;
};

module.exports = { getCategories, getUserByEmail, getUserById, getUsers };
