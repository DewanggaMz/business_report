"use client"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from "@/redux/store"
import { ThemeProvider } from "../theme/ThemeContex"
import { Sidebar } from "../ui/Sidebar/Sidebar"
import { SessionProvider } from "next-auth/react"

export default function ProviderWrapper({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<SessionProvider>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<Sidebar>
						<ThemeProvider>{children}</ThemeProvider>
					</Sidebar>
				</PersistGate>
			</Provider>
		</SessionProvider>
	)
}
