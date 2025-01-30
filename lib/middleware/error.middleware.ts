import { ZodError } from "zod"
import { ResponseError } from "../error/responseError"
import { NextRequest, NextResponse } from "next/server"

export const errorMiddleware = (err: any, req: NextRequest) => {
	if (err instanceof ZodError) {
		return NextResponse.json(
			{
				error: err.issues,
			},
			{
				status: 400,
			}
		)
	} else if (err instanceof ResponseError) {
		console.log(err)
		return NextResponse.json(
			{
				error: err.message,
			},
			{
				status: err.status,
			}
		)
	} else {
		return NextResponse.json(
			{
				errors: err.message || "Internal Server Error",
			},
			{
				status: 500,
			}
		)
	}
}
