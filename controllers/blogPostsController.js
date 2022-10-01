const blogPostsService = require('../services/blogPostsService');

const create = async (req, res) => {
  const infos = req.body;
  const token = req.headers.authorization;

  const newBlogPost = await blogPostsService.create(infos, token);
  const { id, userId, title, content } = newBlogPost;

  return res.status(201).json({ id, userId, title, content });
};

const getAll = async (req, res) => {
  const token = req.headers.authorization;
  const blogPosts = await blogPostsService.getAll(token);
  return res.status(200).json(blogPosts);
};

module.exports = { create, getAll };
