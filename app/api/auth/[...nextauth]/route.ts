import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prismaClient } from "@/lib/database/prismaClient"
import { Validation } from "@/lib/validation/validate"
import { UserValidation } from "@/lib/validation/users.validation"
import bcrypt from "bcrypt"

const handler = NextAuth({
	debug: true,
	adapter: PrismaAdapter(prismaClient),
	providers: [
		CredentialsProvider({
			type: "credentials",
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				const validateFields = Validation.validate(
					UserValidation.LOGIN,
					credentials
				)

				if (!validateFields.success) {
					return null
				}

				const { email, password } = validateFields.data

				const user = await prismaClient.user.findUnique({
					where: { email },
				})

				if (!user || !user.password) {
					throw new Error("no user found")
				}

				const passwordMatch = await bcrypt.compare(password, user.password)

				if (!passwordMatch) {
					return null
				}

				return user
			},
		}),
	],
	pages: {
		signIn: "/login",
	},
	callbacks: {
		async jwt({ token, account, profile, user }) {
			if (account?.provider === "credentials") {
				token.email = user.email
				token.name = user.name
			}
			return token
		},

		async session({ session, token, user }) {
			console.log(session, token, user)
			return session
		},
	},
	session: {
		strategy: "jwt",
	},
	secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
