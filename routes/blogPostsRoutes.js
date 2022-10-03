const { Router } = require('express');
const { checkToken } = require('../middlewares/userMiddlewares');
const { create, getAll } = require('../controllers/blogPostsController');
const {
  checkCategoryIds,
  checkContent,
  checkTitle,
} = require('../middlewares/blogPostMiddlewares');

const routes = Router();

routes.get('/post', checkToken, getAll);
routes.post('/post', checkToken, checkCategoryIds, checkContent, checkTitle, create);

module.exports = routes;
