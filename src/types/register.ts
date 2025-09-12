export type RegisterPayload = {
	email: string;
	password: string;
	role: string;
}

export type RegisterForm = RegisterPayload & {
	confirmPassword: string;
}