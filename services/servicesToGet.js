const { User } = require('../sequelize/models');

const getUser = async (email) => {
  const user = User.findOne({ where: { email } });
  return user;
};

module.exports = { getUser };
