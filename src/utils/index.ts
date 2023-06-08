import { PASSWORD_PATTERN } from '../constants';

export function validatePassword(password: string) {
	return password.match(PASSWORD_PATTERN);
}