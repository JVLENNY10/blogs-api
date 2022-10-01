const jwt = require('jsonwebtoken');
const usersService = require('./usersService');
const { BlogPost } = require('../sequelize/models');
const categoriesService = require('./categoriesService');

const create = async (infos, token) => {
  const userId = jwt.decode(token).data.id;
  const { categoryIds, content, title } = infos;
  const newBlogPost = await BlogPost.create({ categoryIds, userId, title, content });

  return newBlogPost;
};

const getAll = async (token) => {
  const userId = jwt.decode(token).data.id;
  const blogPosts = await BlogPost.findAll();
  const user = await usersService.getById(userId);
  const categories = await categoriesService.getAll();

  return blogPosts.map((post) => {
    const { id, title, content, published, updated } = post;
    return { id, title, content, userId, published, updated, user, categories };
  });
};

module.exports = { create, getAll };
