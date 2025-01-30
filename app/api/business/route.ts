import { response } from "@/lib/utils"
import { BusinessValidation } from "@/lib/validation/business.validation"
import { Validation } from "@/lib/validation/validate"
import { NextRequest, NextResponse } from "next/server"
import { BusinessService } from "./business.service"
import { errorResponse, successResponse } from "@/lib/response"
import { ResponseError } from "@/lib/error/responseError"

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json()
		const validateFields = Validation.validate(
			BusinessValidation.ADDBUSINESS,
			reqBody
		)

		if (!validateFields.success) {
			return NextResponse.json(
				errorResponse(validateFields.error.flatten().fieldErrors),
				{
					status: 400,
				}
			)
		}
		const result = await BusinessService.addBusiness({ reqBody: reqBody })

		console.log(result)

		return NextResponse.json(
			successResponse(validateFields.data, "Business added successfully")
		)
	} catch (error) {
		if (error instanceof ResponseError) {
			return NextResponse.json(errorResponse(error.message), {
				status: error.status,
			})
		} else {
			return NextResponse.json(errorResponse("Failed to fetch user"), {
				status: 500,
			})
		}
	}
}
