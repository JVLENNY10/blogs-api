const { decoder } = require('../helpers/jwtHelpers');
const usersService = require('../services/usersService');

const checkCreate = async (req, res, next) => {
  const { email } = req.body;
  const user = await usersService.login(email);

  if (user !== null) {
    return res.status(409).json({ message: 'User already registered' });
  }

  next();
};

const checkById = async (req, res, next) => {
  const { id } = req.params;
  const user = await usersService.getById(id);

  if (user === null) {
    return res.status(404).json({ message: 'User does not exist' });
  }

  next();
};

const checkDisplayName = async (req, res, next) => {
  const { displayName } = req.body;

  if (displayName.length < 8) {
    return res.status(400).json({
      message: '"displayName" length must be at least 8 characters long',
    });
  }

  next();
};

const checkEmail = async (req, res, next) => {
  const { email } = req.body;

  if (email === undefined) {
    return res.status(400).json({ message: '"email" is required' });
  }

  if (email === '') {
    return res.status(400).json({ message: '"email" is not allowed to be empty' });
  }

  if (!email.includes('@') || !email.split('@')[0]) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }

  next();
};

const checkLogin = async (req, res, next) => {
  const { email } = req.body;
  const user = await usersService.login(email);

  if (user === null) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  next();
};

const checkPassword = async (req, res, next) => {
  const { password } = req.body;

  if (password === undefined) {
    return res.status(400).json({ message: '"password" is required' });
  }

  if (password === '') {
    return res.status(400).json({ message: '"password" is not allowed to be empty' });
  }

  if (password.length !== 6) {
    return res.status(400).json({ message: '"password" length must be 6 characters long' });
  }

  next();
};

const checkToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const { data } = decoder(token, process.env.JWT_SECRET);
    req.authToken = data;
    next();
  } catch (error) {
    if (error.name.includes('Token')) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }

    next(error);
  }
};

module.exports = {
  checkById,
  checkCreate,
  checkDisplayName,
  checkEmail,
  checkLogin,
  checkPassword,
  checkToken,
};
