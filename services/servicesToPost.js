const { BlogPost, Category, User } = require('../sequelize/models');

const createBlogPost = async (blogPostInformations) => {
  const blogPost = await BlogPost.create(blogPostInformations);
  return blogPost;
};

const createCategory = async (name) => {
  const category = await Category.create(name);
  return category;
};

const createUser = async (userInformations) => {
  const user = await User.create(userInformations);
  return user;
};

module.exports = { createBlogPost, createCategory, createUser };