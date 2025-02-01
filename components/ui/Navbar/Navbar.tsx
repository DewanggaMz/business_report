import React from "react"
import ToggleTheme from "@/components/theme/ToggleTheme"
import ToggleSidebar from "./ToggleSidebar"
import { Profile } from "./Profile"

const Navbar = ({ sidebar = false }: { sidebar?: boolean }) => {
	return (
		<nav className="h-14 bg-foreground p-2 px-4 flex items-center justify-between">
			{sidebar && <ToggleSidebar />}
			<div className="flex items-center gap-4 ">
				<ToggleTheme />
				<Profile />
			</div>
		</nav>
	)
}

export default Navbar
