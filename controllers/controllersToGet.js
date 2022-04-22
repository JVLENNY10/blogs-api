const servicesToGet = require('../services/servicesToGet');
// const jwtGenerator = require('../jwt/jwtGenerator');

const getUsers = async (req, res) => {
  const user = await servicesToGet.getUsers();
  // const token = jwtGenerator({ id: user.id, email });

  return res.status(200).json(user);
};

module.exports = { getUsers };
