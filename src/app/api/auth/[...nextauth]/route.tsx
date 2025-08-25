import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { jwtDecode } from "jwt-decode";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from 'next-auth/providers/credentials';

const client = new ApolloClient({
    uri: process.env.GRAPHQL_API_URL,
    cache: new InMemoryCache(),
});

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) return null;

                const mutation = gql`
                  mutation Login($email: String!, $password: String!) {
                    login(userData: {
                      email: $email
                      password: $password
                    }) {
                      accessToken
                      refreshToken
                    }
                  }
                `;

                try {
                    const { data } = await client.mutate({
                        mutation,
                        variables: {
                            email: credentials.email,
                            password: credentials.password
                        }
                    });

                    if (data?.login?.accessToken) {
                        const decoded: any = jwtDecode(data.login.accessToken);

                        return {
                            id: decoded.sub, // 👈 lấy id từ JWT
                            email: credentials.email,
                            accessToken: data.login.accessToken,
                            role: decoded.role,
                        };
                    }
                } catch (error: any) {
                    console.error("GraphQL Login error:", error?.networkError?.result?.errors);
                    return null;
                }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id; // 👈 lưu id vào token
                token.email = user.email;
                token.accessToken = user.accessToken;
                token.role = user.role;
            }
            return token;
        },

        async session({ session, token }) {
            session.user = {
                id: token.id, // ✅ sửa ở đây
                email: token.email,
                accessToken: token.accessToken,
                role: token.role,
            };
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
