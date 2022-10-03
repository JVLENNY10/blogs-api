const { encoder } = require('../helpers/jwtHelpers');
const usersService = require('../services/usersService');

const create = async (req, res) => {
  const { email } = req.body;
  const { id } = await usersService.create(req.body);
  const token = encoder({ id, email });

  return res.status(201).json({ token });
};

const getAll = async (_req, res) => {
  const users = await usersService.getAll();
  return res.status(200).json(users);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const user = await usersService.getById(id);
  return res.status(200).json(user);
};

const login = async (req, res) => {
  const { email } = req.body;
  const { id } = await usersService.login(email);
  const token = encoder({ id, email });

  return res.status(200).json({ token });
};

module.exports = { create, getAll, getById, login };
