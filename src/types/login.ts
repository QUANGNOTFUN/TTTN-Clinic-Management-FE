import {Session} from "next-auth";

export type LoginPayload = {
	email: string;
	password: string;
}

export enum Role {
	MANAGER = 'MANAGER',
	DOCTOR = 'DOCTOR',
	PATIENT = 'PATIENT',
}

export interface CustomSession extends Session {
	access_token?: string;
	user: {
		id?: string;
		email?: string | null;
		role?: string | null;
	};
}