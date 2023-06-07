import express, { Express } from 'express';
import cors                 from 'cors';
import { CORS_OPTIONS }    from './constants';
import { employeesRouter } from './routers/employeesRouter';

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.options('*', cors(CORS_OPTIONS));
app.use(cors(CORS_OPTIONS));

app.use('/employees', employeesRouter)

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at port:${port}`);
});