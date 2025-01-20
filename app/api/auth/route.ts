import { NextResponse } from "next/server"

// Fungsi GET
export async function GET(request: Request) {
	return NextResponse.json({ message: "Hello, this is a GET request!" })
}
