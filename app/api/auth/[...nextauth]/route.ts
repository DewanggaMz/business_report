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
	session: {
		strategy: "jwt",
		maxAge: 7 * 24 * 60 * 60,
	},
	secret: process.env.NEXTAUTH_SECRET,
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

				return {
					id: user.id,
					name: user.name,
					email: user.email,
					image: user.image,
				}
			},
		}),
	],
	pages: {
		signIn: "/login",
	},
	callbacks: {
		async jwt({ token, account, profile, user }) {
			if (account?.provider === "credentials") {
				token.id = user.id
				token.name = user.name
			}
			return token
		},

		async redirect({ url, baseUrl }) {
			console.log({ url })
			console.log({ baseUrl })
			return baseUrl
		},

		async session({
			session,
			token,
			user,
		}: {
			session: any
			token: any
			user: any
		}) {
			if ("id" in token && session.user) {
				session.user.id = token.id
			}
			return session
		},
	},
})

export { handler as GET, handler as POST }
