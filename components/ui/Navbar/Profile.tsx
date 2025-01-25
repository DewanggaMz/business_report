"use client"
import { capitalName } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "../DropdownMenu"
import React from "react"
import { Button } from "@/components/Fragments/Buttons"
import { signOut, useSession } from "next-auth/react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

type UserType = {
	name?: string | null | undefined
	email?: string | null | undefined
	image?: string | null | undefined
}

const Profile = () => {
	const { data, status } = useSession()
	return (
		<>
			{status === "authenticated" ? (
				<ProfileUser user={data.user} />
			) : (
				<Button asChild={true}>
					<Link href="/login">Login</Link>
				</Button>
			)}
		</>
	)
}

const ProfileUser = ({ user }: { user: UserType | undefined }) => {
	if (!user?.name) {
		return null
	}
	const names = capitalName(user.name)

	const handleLogout = async () => {
		await signOut({ redirect: false })
	}

	return (
		<div className="flex items-center gap-2 text-sm">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Avatar className="h-9 w-9 select-none ">
						<AvatarImage src={user.image || ""} alt="@shadcn" />
						<AvatarFallback>{names}</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56">
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<Button
						variant={"ghost"}
						onClick={handleLogout}
						className="w-full p-0"
					>
						<DropdownMenuItem className="w-full">
							Logout
							<DropdownMenuShortcut>
								<ArrowRight size={14} />
							</DropdownMenuShortcut>
						</DropdownMenuItem>
					</Button>
				</DropdownMenuContent>
			</DropdownMenu>
			<span>{user?.name}</span>
		</div>
	)
}

export default Profile
