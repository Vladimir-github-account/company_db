import { Router } from 'express';
import {
	getEmployees
}                 from '../controllers/employee.controller';

export const employeesRouter = Router();

employeesRouter.get('', getEmployees);

// employeeRouter.post('/register', checkEmail, checkPassword, signUp);
//
// employeeRouter.post('/login', signIn);