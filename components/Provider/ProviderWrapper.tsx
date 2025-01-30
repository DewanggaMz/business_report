import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "../theme/ThemeContex"
import { Sidebar } from "../ui/Sidebar/Sidebar"

export default function ProviderWrapper({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<SessionProvider>
			<Sidebar>
				<ThemeProvider>{children}</ThemeProvider>
			</Sidebar>
		</SessionProvider>
	)
}
