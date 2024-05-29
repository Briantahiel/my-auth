import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/libs/db";
import bcrypt from "bcrypt";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "email@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                if (!credentials.email || !credentials.password) {
                    throw new Error('Email and Password are required');
                }

                const userFound = await db.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                if (!userFound) {
                    throw new Error('No user found');
                }

                const matchPassword = await bcrypt.compare(credentials.password, userFound.password);
                
                if (!matchPassword) {
                    throw new Error('Wrong password');
                }

                return {
                    id: userFound.id,
                    name: userFound.username,
                    email: userFound.email
                };
            },
        }),
    ],
    pages: {
        signIn: '/auth/login',
       // error: '/auth/error' 
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        jwt: true,
    },
    callbacks: {
        async session({ session, token }) {
            session.user.id = token.id;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        }
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
