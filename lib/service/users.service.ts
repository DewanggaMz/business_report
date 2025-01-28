"use server"
import { prismaClient } from "@/lib/database/prismaClient"
import { Validation } from "@/lib/validation/validate"
import { UserValidation } from "../validation/users.validation"
import bcrypt from "bcrypt"
import { Prisma } from "@prisma/client"
import { redirect } from "next/navigation"


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
		const hashedPassword = await bcrypt.hash(password, 14)

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
						error: {
							email: ["Email already exists"],
						},
						values: formDataObject,
					}
				}
				if (target?.includes("username")) {
					return {
						error: {
							username: ["Username already exists"],
						},
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

// export const loginUserCredentials = async (
// 	prevState: unknown,
// 	formData: FormData
// ) => {
// 	const formDataObject = Object.fromEntries(
// 		formData.entries() as Iterable<[string, string]>
// 	)
// 	const validateFields = Validation.validate(
// 		UserValidation.LOGIN,
// 		formDataObject
// 	)

// 	if (!validateFields.success) {
// 		return {
// 			error: validateFields.error.flatten().fieldErrors,
// 			values: validateFields.data,
// 		}
// 	}

// 	const { email, password } = validateFields.data
// 	console.log({ email, password })

// 	try {
// 		const response = await signIn("credentials", {
// 			email,
// 			password,
// 			redirectTo: "/",
// 		})
// 		if (!response?.ok) {
// 			switch (response?.error) {
// 				case "CredentialsSignin":
// 					console.log("CredentialsSignin")
// 					return {
// 						message:
// 							"Invalid credentials. Please check your email and password.",
// 					}
// 				default:
// 					return {
// 						message: "An unexpected error occurred. Please try again later.",
// 					}
// 			}
// 		}
// 	} catch (error) {
// 		throw error
// 	}
// }
