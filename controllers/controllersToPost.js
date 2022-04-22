const servicesToPost = require('../services/servicesToPost');
const jwtGenerator = require('../jwt/jwtGenerator');

const createUser = async (req, res) => {
  const { email } = req.body;
  const user = await servicesToPost.createUser(req.body);
  const token = jwtGenerator({ id: user.id, email });

  return res.status(201).json({ token });
};

const loginUser = async (req, res) => {
  const { email } = req.body;
  const user = await servicesToPost.loginUser(req.body);
  const token = jwtGenerator({ id: user.id, email });

  return res.status(200).json({ token });
};

module.exports = { createUser, loginUser };