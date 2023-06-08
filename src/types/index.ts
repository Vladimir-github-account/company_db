export interface ITokenUser {
	id: number;
	name: string;
	bossId: number | null;
	position: string;
}

export interface ITokenRequest extends Express.Request {
	user: ITokenUser;
	body: any;
}