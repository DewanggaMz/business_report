import { compareSync } from "bcrypt-ts"
import NextAuth from "next-auth"
import { prismaClient } from "@/lib/database/prismaClient"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import { Validation } from "./lib/validation/validate"
import { UserValidation } from "./lib/validation/users.validation"

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prismaClient),
	session: {
		strategy: "jwt",
		maxAge: 7 * 24 * 60 * 60,
		updateAge: 24 * 60 * 60,
	},
	pages: {
		signIn: "/login",
	},
	providers: [
		Credentials({
			credentials: {
				email: {
					label: "Email",
					type: "email",
					placeholder: "Email",
					required: true,
				},
				password: {
					label: "Password",
					type: "password",
					placeholder: "Password",
					required: true,
				},
			},
			authorize: async (credentials) => {
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

				const passwordMatch = compareSync(password, user.password)
				if (!passwordMatch) return null

				return {
					id: user.id,
					name: user.name,
					username: user.username,
					email: user.email,
					image: user.image,
				}
			},
		}),
	],
	callbacks: {
		authorized: ({ auth, request: { nextUrl } }) => {
			const isLoggedIn = !!auth?.user
			const protectedRoutes = ["/dashboard"]

			if (!isLoggedIn && protectedRoutes.includes(nextUrl.pathname)) {
				return Response.redirect(new URL("/login", nextUrl))
			}

			if (isLoggedIn && nextUrl.pathname.startsWith("/login")) {
				return Response.redirect(new URL("/dashboard", nextUrl))
			}

			return true
		},

		jwt: async ({ token, account, profile, user }) => {
			// console.log("JWT Token:", token)
			return token
		},
		session: async ({ session, token, user }) => {
			session.user.id = token.sub
			// if ("username" in token && session.user) {
			// }
			return session
		},
	},
})
