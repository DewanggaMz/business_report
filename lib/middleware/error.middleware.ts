import { NextApiRequest, NextApiResponse } from "next"
import { ZodError } from "zod"
import { ResponseError } from "../error/responseError"

export const errorMiddleware = (
	err: Error,
	req: NextApiRequest,
	res: NextApiResponse
) => {
	if (err instanceof ZodError) {
		res.status(400).json({
			errors: err.issues,
		})
	} else if (err instanceof ResponseError) {
		res.status(err.status).json({
			errors: err.message,
		})
	} else {
		res.status(500).json({
			errors: err.message || "Internal Server Error",
		})
	}
}
