const { Router } = require('express');
const { checkToken } = require('../middlewares/userMiddlewares');
const { create, getAll, getById, update } = require('../controllers/blogPostsController');
const {
  checkById,
  checkCategoryIds,
  checkCategoryIdsInUpdate,
  checkContent,
  checkTitle,
  checkUserId,
} = require('../middlewares/blogPostMiddlewares');

const routes = Router();

routes.get('/post', checkToken, getAll);
routes.get('/post/:id', checkToken, checkById, getById);
routes.post('/post', checkToken, checkCategoryIds, checkContent, checkTitle, create);
routes.put(
  '/post/:id',
  checkToken,
  checkUserId,
  checkCategoryIdsInUpdate,
  checkContent,
  checkTitle,
  update,
);

module.exports = routes;
