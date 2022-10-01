const { User } = require('../sequelize/models');

const create = async (infos) => {
  const newUser = await User.create(infos);
  return newUser;
};

const getAll = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return users;
};

const getById = async (id) => {
  const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
  return user;
};

const login = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

module.exports = { create, getAll, getById, login };
