const blogPostsService = require('../services/blogPostsService');

const create = async (req, res) => {
  const infos = req.body;
  const token = req.headers.authorization;

  const newBlogPost = await blogPostsService.create(infos, token);
  const { id, userId, title, content } = newBlogPost;

  return res.status(201).json({ id, userId, title, content });
};

const destroy = async (req, res) => {
  const { id } = req.params;
  await blogPostsService.destroy(id);
  return res.status(204).end();
};

const getAll = async (_req, res) => {
  const blogPosts = await blogPostsService.getAll();
  return res.status(200).json(blogPosts);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const blogPost = await blogPostsService.getById(id);
  return res.status(200).json(blogPost);
};

const getBySearchTerm = async (req, res) => {
  const searchTerm = req.query.q;
  const blogPosts = await blogPostsService.getBySearchTerm(searchTerm);
  return res.status(200).json(blogPosts);
};

const update = async (req, res) => {
  const infos = req.body;
  const { id } = req.params;
  const token = req.headers.authorization;
  const blogPost = await blogPostsService.update(id, infos, token);

  return res.status(200).json(blogPost);
};

module.exports = { create, destroy, getAll, getById, getBySearchTerm, update };
