// utils/response.ts
export type ApiResponse<T> = {
	success: boolean
	message: string
	data?: T
	error?: T
}

export const successResponse = <T>(
	data: T,
	message = "Success"
): ApiResponse<T> => ({
	success: true,
	message,
	data,
})

export const errorResponse = <T>(
	error: T,
	message = "Error"
): ApiResponse<T> => ({
	success: false,
	message,
	error,
})
