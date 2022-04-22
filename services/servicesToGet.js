const { User } = require('../sequelize/models');

const getUser = async (email) => {
  const user = User.findOne({ where: { email } });
  return user;
};

const getUsers = async () => {
  const user = User.findAll();
  return user;
};

module.exports = { getUser, getUsers };