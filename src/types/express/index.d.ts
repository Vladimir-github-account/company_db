import { Request }           from 'express';
import { ITokenUser }        from '../index';

declare global {
	namespace Express {
		interface Request {
			user: ITokenUser,
		}
	}
}