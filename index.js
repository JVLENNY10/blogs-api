require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

const usersRoutes = require('./routes/usersRoutes');
const blogPostsRoutes = require('./routes/blogPostsRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => res.send());

app.use(blogPostsRoutes);
app.use(categoriesRoutes);
app.use(usersRoutes);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
