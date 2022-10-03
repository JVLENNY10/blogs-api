const { Router } = require('express');
const { checkToken } = require('../middlewares/userMiddlewares');
const { create, getAll, getById } = require('../controllers/blogPostsController');
const {
  checkById,
  checkCategoryIds,
  checkContent,
  checkTitle,
} = require('../middlewares/blogPostMiddlewares');

const routes = Router();

routes.get('/post', checkToken, getAll);
routes.get('/post/:id', checkToken, checkById, getById);
routes.post('/post', checkToken, checkCategoryIds, checkContent, checkTitle, create);

module.exports = routes;
