import { capitalName } from "@/lib/utils"
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/Fragments/Avatar"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../../Fragments/DropdownMenu"
import React from "react"
import { Button } from "@/components/Fragments/Buttons"
import Link from "next/link"
import { ButtonLogout } from "./ButtonLogout"
import { getSession } from "@/lib/getSession"

type UserType = {
	name?: string | null | undefined
	email?: string | null | undefined
	image?: string | null | undefined
}

export const Profile = async () => {
	const session = await getSession()

	return (
		<>
			{session?.user ? (
				<ProfileUser user={session?.user} />
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
					<ButtonLogout/>
				</DropdownMenuContent>
			</DropdownMenu>
			<span>{user?.name}</span>
		</div>
	)
}

/* prettier-ignore */
