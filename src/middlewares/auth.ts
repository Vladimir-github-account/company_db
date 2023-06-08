import { Response, Request, NextFunction } from 'express';
import { validatePassword }                from '../utils';
const jwt = require('jsonwebtoken');
const config = process.env;

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
	const token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (!token) {
		return res.status(403).json({ error: 'A token is required for authentication' });
	}
	try {
		const decoded = jwt.verify(token, config.TOKEN_KEY);
		req['user'] = decoded;
	} catch (err) {
		return res.status(401).json({ error: 'Invalid Token' });
	}
	return next();
};

export const checkPassword = (req: Request, res: Response, next: NextFunction) => {
	const { password } = req.body;
	if (!validatePassword(password)) {
		return res.status(400).json({ error: 'Please enter a stronger password' });
	}
	return next();
};