import { headers } from "next/headers"
import { SidebarLayout } from "./SidebarLayout"

export const FilterSidebar = async ({
	children,
}: {
	children: React.ReactNode
}) => {
	const disableSidebar = await headers()
	const disableSidebarValue = disableSidebar.get("x-hide-sidebar") === "true"

	return (
		<>
			{disableSidebarValue ? (
				children
			) : (
				<SidebarLayout>{children}</SidebarLayout>
			)}
		</>
	)
}
