import express, { Express } from 'express';
import cors                 from 'cors';
import { CORS_OPTIONS }     from './constants';

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.options('*', cors(CORS_OPTIONS));
app.use(cors(CORS_OPTIONS));

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at port:${port}`);
});