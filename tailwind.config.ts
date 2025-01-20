import type { Config } from "tailwindcss"

const withOpacityValue = (variable: string): any => {
	return ({ opacityValue }: { opacityValue: string | undefined }) => {
		if (opacityValue !== undefined) {
			return `rgba(${variable}, ${opacityValue})`
		}
		return `rgb(${variable})`
	}
}

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],

	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				textForeground: "var(--text-foreground)",
				primary: withOpacityValue("var(--primary)"),
				acent: "var(--acent)",
				secondary: "var(--secondary)",
				card: "var(--card)",
				acent2: "var(--acent2)",
				acent3: "var(--acent3)",
			},
		},
	},
	plugins: [require("tailwind-scrollbar-hide"), require("tailwindcss-animate")],
} satisfies Config
