const { Router } = require('express');
const { create, getAll, getById, login } = require('../controllers/usersController');
const {
  checkToken,
  checkById,
  checkCreate,
  checkDisplayName,
  checkEmail,
  checkLogin,
  checkPassword,
} = require('../middlewares/userMiddlewares');

const routes = Router();

routes.post('/login', checkEmail, checkLogin, checkPassword, login);
routes.get('/user', checkToken, getAll);
routes.get('/user/:id', checkToken, checkById, getById);
routes.post('/user', checkDisplayName, checkEmail, checkCreate, checkPassword, create);

module.exports = routes;
