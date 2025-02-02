import { ZodType } from "zod"

export class Validation {
	//@typescript-eslint/no-explicit-any
	static validate(schema: ZodType, data: any): any {
		return schema.safeParse(data)
	}
}
