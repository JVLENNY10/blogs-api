const { Op } = require('sequelize');
const { decoder } = require('../helpers/jwtHelpers');
const categoriesService = require('./categoriesService');
const { BlogPost, Category, User } = require('../sequelize/models');

const create = async (infos, token) => {
  const userId = decoder(token).data.id;
  const { categoryIds, content, title } = infos;
  const newBlogPost = await BlogPost.create({ categoryIds, userId, title, content });

  return newBlogPost;
};

const destroy = async (id) => BlogPost.destroy({ where: { id } });

const getAll = async () => {
  const blogPosts = await BlogPost.findAll({
    include: [
      { as: 'user', attributes: { exclude: ['password'] }, model: User },
      { as: 'categories', model: Category, through: { attributes: [] } },
    ],
  });

  return blogPosts;
};

const getById = async (id) => {
  const blogPost = await BlogPost.findByPk(id, {
    include: [
      { as: 'user', attributes: { exclude: ['password'] }, model: User },
      { as: 'categories', model: Category, through: { attributes: [] } },
    ],
  });

  return blogPost;
};

const getBySearchTerm = async (searchTerm) => {
  const blogPosts = await BlogPost.findAll({
    include: [
      { as: 'user', attributes: { exclude: ['password'] }, model: User },
      { as: 'categories', model: Category, through: { attributes: [] } },
    ], 
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${searchTerm}%` } },
        { content: { [Op.like]: `%${searchTerm}%` } },
      ],
    },
  });

  return blogPosts;
};

const update = async (id, infos, token) => {
  const { title, content } = infos;
  const userId = decoder(token).data.id;
  await BlogPost.update(infos, { where: { id } });
  const categories = await categoriesService.getAll();

  return { title, content, userId, categories };
};

module.exports = { create, destroy, getAll, getById, getBySearchTerm, update };
