import { ZodType } from "zod"

export class Validation {
	static validate<T>(schema: ZodType, data: any): any {
		return schema.safeParse(data)
	}
}
