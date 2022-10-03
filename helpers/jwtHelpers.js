require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');

const config = { expiresIn: '1d' };

const decoder = (token) => verify(token, process.env.JWT_SECRET);
const encoder = (payload = {}) => sign({ data: payload }, process.env.JWT_SECRET, config);

module.exports = { decoder, encoder };
