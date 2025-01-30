import { SidebarLayout } from "@/components/ui/Sidebar/SidebarLayout"

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<SidebarLayout>{children}</SidebarLayout>
		</div>
	)
}

export default layout
