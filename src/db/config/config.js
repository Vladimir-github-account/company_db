require('dotenv').config();
const {DB_USER, DB_HOST, DATABASE, DB_USER_PASSWORD, DB_PORT} = process.env;
const config = {
  development: {
    username: DB_USER,
    password: DB_USER_PASSWORD,
    database: DATABASE,
    host: DB_HOST,
    dialect: 'postgres',
    port: DB_PORT,
    migrationStorage: 'json',
    seederStorage: 'json'
  },
  test: {},
  production: {}
};

module.exports = config;