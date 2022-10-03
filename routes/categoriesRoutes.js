const { Router } = require('express');
const { checkToken } = require('../middlewares/userMiddlewares');
const checkCategoryName = require('../middlewares/categoryMiddlewares');
const { create, getAll } = require('../controllers/categoriesController');

const routes = Router();

routes.get('/categories', checkToken, getAll);
routes.post('/categories', checkToken, checkCategoryName, create);

module.exports = routes;
