require('dotenv').config();

module.exports = {
  development: {
    database: 'blogs_api',
    dialect: 'mysql',
    host: process.env.HOSTNAME,
    password: process.env.MYSQL_PASSWORD,
    username: process.env.MYSQL_USER,
  },
  production: {
    database: 'blogs_api',
    dialect: 'mysql',
    host: process.env.HOSTNAME,
    password: process.env.MYSQL_PASSWORD,
    username: process.env.MYSQL_USER,
  },
  test: {
    database: 'blogs_api',
    dialect: 'mysql',
    host: process.env.HOSTNAME,
    password: process.env.MYSQL_PASSWORD,
    username: process.env.MYSQL_USER,
  },
};
