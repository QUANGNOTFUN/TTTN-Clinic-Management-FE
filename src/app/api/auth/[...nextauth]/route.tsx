import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

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
                      `${process.env.NEXT_PUBLIC_API_URL}auth/login`,
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
                token.accessToken = user.accessToken;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.role = token.role;
            session.user.accessToken = token.accessToken;
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
});

export { handler as GET, handler as POST };
