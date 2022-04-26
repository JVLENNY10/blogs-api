require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

const {
  getBlogPosts, getCategories, getUserById, getUsers,
} = require('./controllers/controllersToGet');

const {
  createBlogPost, createCategory, createUser, loginUser,
} = require('./controllers/controllersToPost');

const checkBlogPostInformations = require('./middlewares/blogPostMiddlewares');
const checkCategoryName = require('./middlewares/categoryMiddlewares');
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

app.get('/categories', authToken, getCategories);
app.post('/categories', authToken, checkCategoryName, createCategory);

app.post(
  '/login', checkEmailIsNotNull, checkEmailIsValid, checkEmailNotExists, checkPassword, loginUser,
);

app.get('/post', authToken, getBlogPosts);
app.post('/post', authToken, checkBlogPostInformations, createBlogPost);

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

app.listen(3000, () => console.log('ouvindo porta 3000!'));
