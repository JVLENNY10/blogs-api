const { User } = require('../sequelize/models');

const getUserByEmail = async (email) => {
  const user = User.findOne({ where: { email } });
  return user;
};

const getUsers = async () => {
  const user = User.findAll({ attributes: { exclude: ['password'] } });
  return user;
};

module.exports = { getUserByEmail, getUsers };
