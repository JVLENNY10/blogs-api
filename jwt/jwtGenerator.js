require('dotenv').config();
const jwt = require('jsonwebtoken');

const jwtConfig = { expiresIn: '1d' };

module.exports = (payload = {}) => jwt.sign({ data: payload }, process.env.JWT_SECRET, jwtConfig);
