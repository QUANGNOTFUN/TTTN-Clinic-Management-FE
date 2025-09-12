export type LoginPayload = {
	email: string;
	password: string;
}

export type SessionUser = {
	id: string;
	email: string;
	role: string;
}

export type LoginResponse = {
	message: string;
	access_token: string;
	user: SessionUser;
}