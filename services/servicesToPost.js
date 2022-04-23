const { Category, User } = require('../sequelize/models');

const createCategory = async (name) => {
  const category = await Category.create(name);
  return category;
};

const createUser = async (userInformations) => {
  const user = await User.create(userInformations);
  return user;
};

module.exports = { createCategory, createUser };