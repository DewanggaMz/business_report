import { z, ZodType } from "zod"

export class BusinessValidation {
	static readonly ADDBUSINESS: ZodType = z.object({
		name: z
			.string()
			.min(3, "Name must be at least 3 characters")
			.max(50, "Name must be at most 50 characters"),
		address: z
			.string()
			.min(3, "Address must be at least 3 characters")
			.max(100, "Address must be at most 100 characters"),
		description: z
			.string()
			.max(200, "Description must be at most 200 characters"),
		owners: z.array(
			z.object({
				owner: z.string().min(3, "Owner name must be at least 3 characters"),
				initialCapital: z.string(),
			})
		),
	})
}
