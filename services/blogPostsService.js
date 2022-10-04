const usersService = require('./usersService');
const { BlogPost } = require('../sequelize/models');
const { decoder } = require('../helpers/jwtHelpers');
const categoriesService = require('./categoriesService');

const create = async (infos, token) => {
  const userId = decoder(token).data.id;
  const { categoryIds, content, title } = infos;
  const newBlogPost = await BlogPost.create({ categoryIds, userId, title, content });

  return newBlogPost;
};

const getAll = async () => {
  const blogPosts = await BlogPost.findAll();
  const categories = await categoriesService.getAll();

  const { userId } = blogPosts[0];
  const user = await usersService.getById(userId);

  return blogPosts.map((post) => {
    const { id, title, content, published, updated } = post;
    return { id, title, content, userId, published, updated, user, categories };
  });
};

const getById = async (id) => {
  const blogPost = await BlogPost.findByPk(id);
  return blogPost;
};

const mountById = async (id) => {
  const categories = await categoriesService.getAll();
  const { title, content, userId, published, updated } = await getById(id);
  const user = await usersService.getById(userId);
  
  return { id: Number(id), title, content, userId, published, updated, user, categories };
};

const update = async (id, infos, token) => {
  const { title, content } = infos;
  const userId = decoder(token).data.id;
  await BlogPost.update(infos, { where: { id } });
  const categories = await categoriesService.getAll();

  return { title, content, userId, categories };
};

module.exports = { create, getAll, getById, mountById, update };
