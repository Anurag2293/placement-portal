import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",

            credentials: {
                email: { label: "Email", type: "email", placeholder: "john@gmail.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const res = await fetch(`${process.env.NEXTAUTH_URL}/api/company/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    })
                })
                const user = await res.json()
                
                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                } else {
                    return null
                }
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async session({ session } : { session: any }) {
            const companyProfile = await prisma.company.findUnique({
                where: {
                    email: session.user.email
                },
                select: {
                    id: true,
                }
            })
            session.user.id = companyProfile?.id
            return session
        }
    },
    pages: {
        signIn: '/hire/sign-in',
    }
})

export { handler as GET, handler as POST }