require('dotenv').config();
const {DB_USER, HOST, DATABASE, PASSWORD, PORT} = process.env;
const config = {
  development: {
    username: DB_USER,
    password: PASSWORD,
    database: DATABASE,
    host: HOST,
    dialect: 'postgres',
    port: PORT,
    migrationStorage: 'json',
    seederStorage: 'json'
  },
  test: {},
  production: {}
};

module.exports = config;