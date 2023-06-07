import { Sequelize } from 'sequelize-typescript';
require('dotenv').config();

const db = process.env.DATABASE || 'company';
const username = process.env.DB_USER || 'postgres';
const password = process.env.DB_USER_PASSWORD;
const host = process.env.DB_HOST || '127.0.0.1';

const sequelize = new Sequelize(db, username, password, {
	host,
	dialect: 'postgres',
	port: 5432,
	models: [__dirname + '/models/']
});

export default sequelize;