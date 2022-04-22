const servicesToGet = require('../services/servicesToGet');

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

  if (!password) {
    return res.status(400).json({ message: '"password" is required' });
  }

  if (password.length !== 6) {
    return res.status(400).json({ message: '"password" length must be 6 characters long' });
  }

  next();
};

const emailExists = async (req, res, next) => {
  const { email } = req.body;
  const exist = await servicesToGet.getUser(email);

  if (exist !== null) {
    return res.status(409).json({ message: 'User already registered' });
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

  if (!email) {
    return res.status(400).json({ message: '"email" is required' });
  }

  next();
};

module.exports = { checkDisplayName, checkPassword, emailExists, emailIsValid, emailNotNull };
