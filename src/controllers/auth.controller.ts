import { Request, Response } from 'express';
import Employee              from '../db/models/Employee';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export const signUp = async (req: Request, res: Response) => {
	try {
		const { name, position, password, bossId } = req.body;
		if (!(position && password && name)) {
			return res.status(400).json({ error: 'All input is required' });
		}
		const encryptedPassword = await bcrypt.hash(password, 10);
		const user = await Employee.create({
			name,
			position,
			password: encryptedPassword,
			bossId
		});
		const { id } = user.get();
		const token = jwt.sign(
			{ id, name, position, bossId },
			process.env.TOKEN_KEY,
			{
				expiresIn: '24 days',
			},
		);
		const userData = { id, name, token, position, bossId };
		return res.status(201).json(userData);
	} catch (err) {
		console.log(err);
		return res.status(400).json({ error: 'Bad Request' });
	}
};

export const signIn = async (req: Request, res: Response) => {
	try {
		const { name, password, position } = req.body;
		if (!(name && password && position)) {
			return res.status(400).json({ error: 'All input is required' });
		}
		const user = await Employee.findOne({
			where: {
				name,
				position
			}
		});
		if (user && (await bcrypt.compare(password, user.password))) {
			const { position, id, name, bossId } = user.get();
			const token = jwt.sign(
				{ id, name, position, bossId },
				process.env.TOKEN_KEY,
				{
					expiresIn: '24 days',
				},
			);
			const userData = { id, name, token, position, bossId };
			return res.status(200).json(userData);
		} else {
			return res.status(400).json({ error: 'Invalid Credentials' });
		}
	} catch (err) {
		console.log(err);
		return res.status(400).json({ error: 'Bad Request' });
	}
};