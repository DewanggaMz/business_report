import { ClassValue, clsx } from "clsx"
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
