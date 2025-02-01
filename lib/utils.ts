import { ClassValue, clsx } from "clsx"
import { NextResponse } from "next/server"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const formatToIDR = (amount = 0): string => {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(amount)
}

export const capitalName = (name: string): string => {
	const word = name.split(" ")
	return word
		.map((word) => word.charAt(0).toUpperCase())
		.slice(0, 2)
		.join("")
}

export const getLast12Months = (currentMonth: number, currentYear: number) => {
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"Mei",
		"Jun",
		"Jul",
		"Ags",
		"Sep",
		"Okt",
		"Nov",
		"Des",
	]
	let result = []

	for (let i = 0; i < 12; i++) {
		const monthIndex = (currentMonth - 1 - i + 12) % 12
		const year = currentYear - Math.ceil((i - currentMonth + 1) / 12)
		const splitYear = year.toString().slice(-2)
		result.push(`${months[monthIndex]} ${splitYear}`)
	}

	return result.reverse()
}
