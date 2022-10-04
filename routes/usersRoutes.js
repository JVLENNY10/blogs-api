const { Router } = require('express');
const { create, destroy, getAll, getById, login } = require('../controllers/usersController');
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

routes.delete('/user/me', checkToken, destroy);
routes.get('/user', checkToken, getAll);
routes.get('/user/:id', checkToken, checkById, getById);
routes.post('/user', checkDisplayName, checkEmail, checkCreate, checkPassword, create);
routes.post('/login', checkEmail, checkLogin, checkPassword, login);

module.exports = routes;
