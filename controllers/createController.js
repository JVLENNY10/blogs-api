const { User } = require('../sequelize/models');

const createUser = async (req, res) => {
  const token = req.headers.authorization;
  await User.create(req.body);
  return res.status(201).json({ token });
};

module.exports = { createUser };