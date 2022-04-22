require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

const { createUser } = require('./controllers/controllersToCreate');

const {
  checkDisplayName, checkPassword, emailExists, emailIsValid, emailNotNull,
} = require('./middlewares/userMiddlewares');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => res.send());

app.post(
  '/user', checkDisplayName, checkPassword, emailNotNull, emailIsValid, emailExists, createUser,
);

app.post('/login');

app.listen(3000, () => console.log('ouvindo porta 3000!'));
