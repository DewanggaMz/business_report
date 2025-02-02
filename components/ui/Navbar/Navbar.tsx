import React from "react"
import ToggleTheme from "@/components/theme/ToggleTheme"
import ToggleSidebar from "./ToggleSidebar"
import { Profile } from "./Profile"
import { cn } from "@/lib/utils"

const Navbar = ({ sidebar = false }: { sidebar?: boolean }) => {
	return (
		<nav
			className={cn(
				"h-14 bg-foreground p-2 px-4 flex items-center border-b border-neutral-400 dark:border-neutral-600",
				sidebar ? "justify-between" : "justify-end"
			)}
		>
			{sidebar && <ToggleSidebar />}
			<div className="flex items-center gap-4 ">
				<ToggleTheme />
				<Profile />
			</div>
		</nav>
	)
}

export default Navbar
