const { User } = require('../sequelize/models');

const getUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const getUserById = async (id) => {
  const user = await User.findOne({ where: { id } });
  return user;
};

const getUsers = async () => {
  const user = await User.findAll({ attributes: { exclude: ['password'] } });
  return user;
};

module.exports = { getUserByEmail, getUserById, getUsers };
