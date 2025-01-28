import { response } from "@/lib/utils"
import { BusinessValidation } from "@/lib/validation/business.validation"
import { Validation } from "@/lib/validation/validate"
import { NextRequest } from "next/server"
import { BusinessService } from "./business.service"

export async function POST(request: NextRequest) {
	const body = await request.json()
	const result = BusinessService.addBusiness({ reqBody: body })

	console.log(result)

	try {
		// if (!validateFields.success) {
		// 	return response({
		// 		error: validateFields.error.flatten().fieldErrors,
		// 		status: 400,
		// 	})
		// }
		// return response({
		// 	data: validateFields.data,
		// 	message: "Business created successfully",
		// 	status: 200,
		// })
	} catch (error) {
		return response({
			error: "Internal server error",
			status: 500,
		})
	}
}
