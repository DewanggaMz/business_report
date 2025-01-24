"use client"
import React from "react"
import { GiHamburgerMenu } from "react-icons/gi"
import { Button } from "@/components/Fragments/Buttons"
import { useSidebar } from "@/components/ui/Sidebar"
import ToggleTheme from "@/components/theme/ToggleTheme"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "./DropdownMenu"
import { ArrowRight } from "lucide-react"

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
			<div className="flex items-center gap-4 ">
				<ToggleTheme />

				<div className="flex items-center gap-2 text-sm">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Avatar className="h-9 w-9 select-none">
								<AvatarImage
									src="https://assets.aceternity.com/manu.png"
									alt="@shadcn"
								/>
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56">
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								Log out
								<DropdownMenuShortcut>
									<ArrowRight size={14} />
								</DropdownMenuShortcut>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					<span>Dewangga</span>
				</div>

				{/* <Button asChild={true}>
					<Link href="/login">Login</Link>
				</Button> */}
			</div>
		</nav>
	)
}

export default Navbar
