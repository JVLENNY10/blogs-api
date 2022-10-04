const { Router } = require('express');
const { checkToken } = require('../middlewares/userMiddlewares');
const {
  create,
  destroy,
  getAll,
  getById,
  getBySearchTerm,
  update,
} = require('../controllers/blogPostsController');
const {
  checkById,
  checkCategoryIds,
  checkCategoryIdsInUpdate,
  checkContent,
  checkTitle,
  checkUserId,
} = require('../middlewares/blogPostMiddlewares');

const routes = Router();

routes.delete('/post/:id', checkToken, checkById, checkUserId, destroy);
routes.get('/post', checkToken, getAll);
routes.get('/post/search', checkToken, getBySearchTerm);
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
