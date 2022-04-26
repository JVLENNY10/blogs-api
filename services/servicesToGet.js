const { BlogPost, Category, User } = require('../sequelize/models');

const getBlogPosts = async () => {
  const blogPosts = await BlogPost.findAll();
  return blogPosts;
};

const getCategories = async () => {
  const categories = await Category.findAll();
  return categories;
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

module.exports = { getBlogPosts, getCategories, getUserByEmail, getUserById, getUsers };
