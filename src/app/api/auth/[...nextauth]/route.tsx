import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/libs/db";
import bcrypt from "bcrypt";
export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "jdoe" },
                password: { label: "Password", type: "password", placeholder: "******" },
            },
            async authorize(credentials, req) {
                const userFound = await db.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })
                if(!userFound) 
                    throw new Error('No user found')
                const matchPassword = await bcrypt.compare(credentials.password, userFound.password)
                console.log(userFound)
                if(!matchPassword) 
                    throw new Error('Wrong password')
                return {
                    id: userFound.id,
                    name: userFound.username,
                    email: userFound.email
                }
               
            },
        }),
    ],
    pages: {
        signIn: '/auth/login'
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
