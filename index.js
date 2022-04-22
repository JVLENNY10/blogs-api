require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

const { createUser, loginUser } = require('./controllers/controllersToPost');

const {
  checkDisplayName,
  checkPassword,
  loginEmailExists,
  registrationEmailExists,
  emailIsValid,
  emailNotNull,
} = require('./middlewares/userMiddlewares');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => res.send());

app.post(
  '/user',
  checkDisplayName,
  checkPassword,
  emailNotNull,
  emailIsValid,
  registrationEmailExists,
  createUser,
);

app.post('/login', checkPassword, emailNotNull, emailIsValid, loginEmailExists, loginUser);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
