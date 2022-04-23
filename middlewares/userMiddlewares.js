const jwt = require('jsonwebtoken');
const servicesToGet = require('../services/servicesToGet');

const authToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (token === undefined) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.authToken = decoded.data;
    next();
  } catch (error) {
    if (error.name.includes('Token')) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }

    next(error);
  }
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

const checkEmailExists = async (req, res, next) => {
  const { email } = req.body;
  const exist = await servicesToGet.getUserByEmail(email);

  if (exist !== null) {
    return res.status(409).json({ message: 'User already registered' });
  }

  next();
};

const checkEmailIsValid = async (req, res, next) => {
  const { email } = req.body;
  const emailParts = email.split('@');

  if (!email.includes('@') || !emailParts[0] || !emailParts[1]) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }

  next();
};

const checkEmailIsNotNull = async (req, res, next) => {
  const { email } = req.body;

  if (email === undefined) {
    return res.status(400).json({ message: '"email" is required' });
  }

  if (email === '') {
    return res.status(400).json({ message: '"email" is not allowed to be empty' });
  }

  next();
};

const checkEmailNotExists = async (req, res, next) => {
  const { email } = req.body;
  const exist = await servicesToGet.getUserByEmail(email);

  if (exist === null) {
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

const checkUserExistsById = async (req, res, next) => {
  const { id } = req.params;
  const exist = await servicesToGet.getUserById(id);

  if (exist === null) {
    return res.status(404).json({ message: 'User does not exist' });
  }

  next();
};

module.exports = {
  authToken,
  checkDisplayName,
  checkEmailExists,
  checkEmailIsNotNull,
  checkEmailIsValid,
  checkEmailNotExists,
  checkPassword,
  checkUserExistsById,
};
