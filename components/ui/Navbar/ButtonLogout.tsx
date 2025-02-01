"use client"

import { Button } from "@/components/Fragments/Buttons"
import { signOut } from "next-auth/react"
import {
	DropdownMenuItem,
	DropdownMenuShortcut,
} from "../../Fragments/DropdownMenu"
import { ArrowRight } from "lucide-react"

export const ButtonLogout = () => {
	const handleLogout = async () => {
		await signOut({ redirectTo: "/" })
	}
	return (
		<Button variant={"ghost"} onClick={handleLogout} className="w-full p-0">
			<DropdownMenuItem className="w-full">
				Logout
				<DropdownMenuShortcut>
					<ArrowRight size={14} />
				</DropdownMenuShortcut>
			</DropdownMenuItem>
		</Button>
	)
}
