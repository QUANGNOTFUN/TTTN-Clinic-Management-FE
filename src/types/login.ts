import {Session} from "next-auth";

export type LoginPayload = {
	email: string;
	password: string;
}


export interface CustomSession extends Session {
	user: {
		name?: string | null;
		email?: string | null;
		image?: string | null;
		accessToken?: string;
	};
}