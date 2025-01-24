import { z, ZodType } from "zod"

export class UserValidation {
	static readonly REGISTER: ZodType = z
		.object({
			fullname: z
				.string()
				.min(3, "Fullname must be at least 3 characters")
				.regex(
					/^[a-zA-Z\s]+$/,
					"Fullname must contain only letters and spaces"
				),
			username: z
				.string()
				.min(3, "Username must be at least 3 characters")
				.regex(
					/^[a-zA-Z0-9_]+$/,
					"Username must contain only letters, numbers, and underscores"
				),
			email: z.string().email("Invalid email address"),
			phone: z
				.string()
				.min(10, "Phone number must be at least 10 characters")
				.regex(/^[0-9]+$/, "Phone number must contain only numbers"),
			password: z
				.string()
				.min(6, "Password must be at least 6 characters")
				.max(35, "Password must be at most 35 characters"),
			confirmPassword: z
				.string()
				.min(6, "Password must be at least 6 characters")
				.max(35, "Password must be at most 35 characters"),
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: "Passwords do not match",
			path: ["confirmPassword"],
		})

	static readonly LOGIN: ZodType = z.object({
		email: z.string().email("Invalid email address"),
		password: z
			.string()
			.min(6, "Password must be at least 6 characters")
			.max(35, "Password must be at most 35 characters"),
	})
}
