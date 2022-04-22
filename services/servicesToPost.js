const { User } = require('../sequelize/models');

const createUser = async (userInformations) => {
  const user = await User.create(userInformations);
  return user;
};

module.exports = { createUser };