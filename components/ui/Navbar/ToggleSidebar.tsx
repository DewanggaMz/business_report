"use client"
import { useSidebar } from "../Sidebar"
import { Button } from "@/components/Fragments/Buttons"
import { GiHamburgerMenu } from "react-icons/gi"

export const ToggleSidebar = () => {
	const { toggleSidebar } = useSidebar()

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

export default ToggleSidebar
