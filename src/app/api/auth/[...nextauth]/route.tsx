import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { LOGIN_API_URL } from "@/lib/api/auth";

export type SessionUser = {
	id: string;
	email: string;
	role: string;
	accessToken: string;
	name?: string | null;
	image?: string | null;
};

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				try {
					const res = await axios.post(
						LOGIN_API_URL,
						{
							email: credentials?.email,
							password: credentials?.password,
						}
					);
					
					const user = res.data;
					
					if (user) {
						return {
							id: user.user.id,
							email: user.user.email,
							role: user.user.role,
							accessToken: user.access_token,
						};
					}
					return null;
				} catch (e) {
					console.log(e);
					return null;
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				const sessionUser = user as SessionUser;
				token.id = sessionUser.id;
				token.email = sessionUser.email;
				token.role = sessionUser.role;
				token.accessToken = sessionUser.accessToken;
			}
			return token;
		},
		async session({ session, token }) {
			return {
				access_token: token.accessToken,
				user: {
					id: token.id,
					email: token.email,
					role: token.role,
				},
				expires: session.expires,
			};
		},
	},
	pages: {
		signIn: "/login",
	},
});

export { handler as GET, handler as POST };