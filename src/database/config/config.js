import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_TEST_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
  },
  production: {
    username: process.env.User,
    password: process.env.Password,
    database: process.env.Database,
    host: process.env.HOST,
    url: process.env.URI,
    dialect: 'postgres',
    host_name: process.env.Heroku_CLI,
    logging: false,
  },
};
