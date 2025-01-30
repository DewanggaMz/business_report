import { SidebarBody, SidebarLink } from "@/components/ui/Sidebar/Sidebar"
import {
	IconBrandTabler,
	IconSettings,
	IconUserBolt,
} from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import { WrapperLayout } from "../Wrapper/WrapperLayout"
import { SidebarHeader } from "./SidebarHeader"
import { getSession } from "@/lib/getSession"

export async function SidebarLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const session = await getSession()
	const linksAfterLogin = [
		{
			label: "Home",
			href: "/",
			icon: (
				<IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
			),
		},
		{
			label: "Profile",
			href: "#",
			icon: (
				<IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
			),
		},
		{
			label: "Settings",
			href: "#",
			icon: (
				<IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
			),
		},
	]

	return (
		<div
			className={cn(
				"rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-full mx-auto dark:border-neutral-700  overflow-y-hidden",
				"h-screen"
			)}
		>
			<SidebarBody className="justify-between gap-10">
				<div
					className={cn(
						"custom-scrollbar",
						"flex flex-col flex-1 overflow-y-auto overflow-x-hidden"
					)}
				>
					<SidebarHeader />
					<div className="mt-8 flex flex-col gap-2">
						{session ? (
							linksAfterLogin.map((link, idx) => (
								<SidebarLink key={idx} link={link} />
							))
						) : (
							<SidebarLink link={linksAfterLogin[0]} />
						)}
					</div>
				</div>
			</SidebarBody>
			<WrapperLayout>{children}</WrapperLayout>
		</div>
	)
}
