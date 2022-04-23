require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

const { getUserById, getUsers } = require('./controllers/controllersToGet');
const { createUser, loginUser } = require('./controllers/controllersToPost');
const {
  authToken,
  checkDisplayName,
  checkEmailExists,
  checkEmailIsNotNull,
  checkEmailIsValid,
  checkEmailNotExists,
  checkPassword,
  checkUserExistsById,
} = require('./middlewares/userMiddlewares');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => res.send());

app.get('/user', authToken, getUsers);
app.get('/user/:id', authToken, checkUserExistsById, getUserById);

app.post(
  '/user',
  checkDisplayName,
  checkEmailIsNotNull,
  checkEmailIsValid,
  checkEmailExists,
  checkPassword,
  createUser,
);

app.post(
  '/login', checkEmailIsNotNull, checkEmailIsValid, checkEmailNotExists, checkPassword, loginUser,
);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
