const jwt = require('jsonwebtoken');
const jwtGenerator = require('../jwt/jwtGenerator');
const servicesToGet = require('../services/servicesToGet');
const servicesToPost = require('../services/servicesToPost');

const createBlogPost = async (req, res) => {
  const token = req.headers.authorization;
  const userId = jwt.decode(token).data.id;
  const { categoryIds, content, title } = req.body;

  const blogPost = await servicesToPost.createBlogPost({ categoryIds, userId, title, content });
  const { id } = blogPost;

  return res.status(201).json({ id, userId, title, content });
};

const createCategory = async (req, res) => {
  const category = await servicesToPost.createCategory(req.body);
  return res.status(201).json(category);
};

const createUser = async (req, res) => {
  const { email } = req.body;
  const user = await servicesToPost.createUser(req.body);
  const token = jwtGenerator({ id: user.id, email });

  return res.status(201).json({ token });
};

const loginUser = async (req, res) => {
  const { email } = req.body;
  const user = await servicesToGet.getUserByEmail(email);
  const token = jwtGenerator({ id: user.id, email });

  return res.status(200).json({ token });
};

module.exports = { createBlogPost, createCategory, createUser, loginUser };