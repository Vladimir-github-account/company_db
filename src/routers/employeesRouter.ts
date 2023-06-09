import { RequestHandler, Router }           from 'express';
import { changeEmployeeBoss, getEmployees } from '../controllers/employee.controller';
import { signIn, signUp }                   from '../controllers/auth.controller';
import { checkPassword, verifyToken }       from '../middlewares/auth';

export const employeesRouter = Router();

employeesRouter.post('/register', checkPassword, signUp);

employeesRouter.post('/login', signIn);

employeesRouter.get('', verifyToken, getEmployees as RequestHandler);

employeesRouter.put('', verifyToken, changeEmployeeBoss as RequestHandler);