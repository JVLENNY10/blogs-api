const jwt = require('jsonwebtoken');
const servicesToGet = require('../services/servicesToGet');

const authToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.auth = decoded.data;
    next();
  } catch (error) {
    if (error.name.incluedes('Token')) {
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

const emailIsValid = async (req, res, next) => {
  const { email } = req.body;
  const emailParts = email.split('@');

  if (!email.includes('@') || !emailParts[0] || !emailParts[1]) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }

  next();
};

const emailNotNull = async (req, res, next) => {
  const { email } = req.body;

  if (email === undefined) {
    return res.status(400).json({ message: '"email" is required' });
  }

  if (email === '') {
    return res.status(400).json({ message: '"email" is not allowed to be empty' });
  }

  next();
};

const loginEmailExists = async (req, res, next) => {
  const { email } = req.body;
  const exist = await servicesToGet.getUser(email);
  console.log(exist);
  if (exist === null) {
    console.log('Aqui!');
    return res.status(400).json({ message: 'Invalid fields' });
  }

  next();
};

const registrationEmailExists = async (req, res, next) => {
  const { email } = req.body;
  const exist = await servicesToGet.getUser(email);

  if (exist !== null) {
    return res.status(409).json({ message: 'User already registered' });
  }

  next();
};

module.exports = {
  authToken,
  checkDisplayName,
  checkPassword,
  emailIsValid,
  emailNotNull,
  loginEmailExists,
  registrationEmailExists,
};
