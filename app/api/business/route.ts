import { BusinessValidation } from "@/lib/validation/business.validation"
import { Validation } from "@/lib/validation/validate"
import { NextRequest, NextResponse } from "next/server"
import { BusinessService } from "./business.service"
import { errorResponse } from "@/lib/response"
import { ResponseError } from "@/lib/error/responseError"

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json()
		const validateFields = Validation.validate(
			BusinessValidation.ADDBUSINESS,
			reqBody
		)
		// const validateFields = BusinessValidation.ADDBUSINESS.safeParse(reqBody)

		if (!validateFields.success) {
			console.log(validateFields.error.flatten().fieldErrors)
			return NextResponse.json(
				errorResponse(validateFields.error.flatten().fieldErrors),
				{
					status: 400,
				}
			)
		}
		const res = await BusinessService.addBusiness({
			reqBody: validateFields.data,
		})

		return res
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

export async function GET(request: NextRequest) {
	try {
		const params = request.nextUrl.searchParams
		const res = await BusinessService.getBusinesses({ params })
		return res
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
