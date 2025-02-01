"use server"
import { prismaClient } from "@/lib/database/prismaClient"
import { Validation } from "@/lib/validation/validate"
import { UserValidation } from "../validation/users.validation"
import { Prisma } from "@prisma/client"
import { redirect } from "next/navigation"
import { hashSync } from "bcrypt-ts"
import { signIn } from "@/auth"
import { AuthError } from "next-auth"

export const registerUserCredentials = async (
	prevState: unknown,
	formData: FormData
) => {
	const formDataObject = Object.fromEntries(
		formData.entries() as Iterable<[string, string]>
	)
	const validateFields = Validation.validate(
		UserValidation.REGISTER,
		formDataObject
	)

	if (!validateFields.success) {
		return {
			error: validateFields.error.flatten().fieldErrors,
			values: validateFields.data,
		}
	}

	const { fullname, username, email, phone, password, confirmPassword } =
		validateFields.data

	if (password !== confirmPassword) {
		return {
			error: {
				confirmPassword: ["Passwords do not match"],
			},
			values: formDataObject,
		}
	}

	try {
		const hashedPassword = hashSync(password, 14)

		await prismaClient.user.create({
			data: {
				name: fullname,
				username,
				email,
				phone,
				password: hashedPassword,
			},
			select: {
				id: true,
				name: true,
				username: true,
				email: true,
			},
		})
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2002") {
				const target = (error.meta as any)?.target
				if (target?.includes("email")) {
					return {
						message: ["Email already exists"],
						values: formDataObject,
					}
				}
				if (target?.includes("username")) {
					return {
						message: ["Username already exists"],
						values: formDataObject,
					}
				}
			}
		} else {
			return {
				message: "An unexpected error occurred",
			}
		}
	}

	redirect("/login")
}

export const loginUserCredentials = async (
	prevState: unknown,
	formData: FormData
) => {
	const formDataObject = Object.fromEntries(
		formData.entries() as Iterable<[string, string]>
	)
	const validateFields = Validation.validate(
		UserValidation.LOGIN,
		formDataObject
	)

	if (!validateFields.success) {
		return {
			error: validateFields.error.flatten().fieldErrors,
			values: validateFields.data,
		}
	}

	const { email, password } = validateFields.data

	try {
		const res = await signIn("credentials", {
			email,
			password,
			redirectTo: "/dashboard",
		})
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return {
						message: "Email or password is incorrect",
					}
				default:
					return {
						message: "Email or password is incorrect",
					}
			}
		}
		throw error
	}
}
