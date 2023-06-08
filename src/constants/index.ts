export const PASSWORD_PATTERN = /(?=.*?\d)(?=.*?[a-z])(?=.*?[A-Z])^[a-zA-Z0-9_$%@?!#]{8,60}$/;

export const CORS_OPTIONS = {
	origin: true,
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	credentials: true,
	maxAge: 3600
};