import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { FilterSidebar } from "../components/ui/SidebarLayout"
import { ThemeProvider } from "@/components/theme/ThemeContex"
import SessionProviderWrapper from "@/components/SessionProviderWrapper"

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
})

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
})

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased light`}
			>
				<SessionProviderWrapper>
					<ThemeProvider>
						<FilterSidebar>{children}</FilterSidebar>
					</ThemeProvider>
				</SessionProviderWrapper>
			</body>
		</html>
	)
}
