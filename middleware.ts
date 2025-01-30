import { auth } from "@/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
	const hideSidebarRoutes = ["/login", "/register"]
	if (hideSidebarRoutes.includes(request.nextUrl.pathname)) {
		console.log("hide sidebar")
		const response = NextResponse.next()
		response.headers.set("x-hide-sidebar", "true")
		return response
	}

	const authResponse = await auth(request as any)
	if (authResponse) {
		return authResponse
	}

	return NextResponse.next()
}

export const config = {
	matcher: ["/((?!api|_next|static).*)"], // Tentukan jalur di mana middleware berlaku
}
