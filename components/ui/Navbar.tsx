"use client"
import React from "react"
import { GiHamburgerMenu } from "react-icons/gi"
import { Button } from "../Fragments/Buttons"
import { useSidebar } from "./Sidebar"
import ToggleTheme from "../theme/ToggleTheme"

export const ToggleSidebar = () => {
	const { open, setOpen, toggleSidebar } = useSidebar()

	return (
		<Button
			variant={"outline"}
			className="hidden md:flex"
			size={"icon"}
			onClick={toggleSidebar}
		>
			<GiHamburgerMenu />
		</Button>
	)
}

const Navbar = () => {
	return (
		<nav className="h-14 bg-foreground p-2 px-4 flex items-center justify-between">
			<ToggleSidebar />
			<ToggleTheme />
		</nav>
	)
}

export default Navbar
