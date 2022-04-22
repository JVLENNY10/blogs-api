const servicesToGet = require('../services/servicesToGet');

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await servicesToGet.getUserById(id);
  return res.status(200).json(user);
};

const getUsers = async (_req, res) => {
  const user = await servicesToGet.getUsers();
  return res.status(200).json(user);
};

module.exports = { getUserById, getUsers };
