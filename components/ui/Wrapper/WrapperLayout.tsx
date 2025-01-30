import Navbar from "../Navbar/Navbar"

export const WrapperLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex flex-1">
			<div className="border border-neutral-300 dark:border-neutral-700 bg-foreground w-full h-full">
				<Navbar />
				<div className="bg-secondary rounded-lg h-[100vh] overflow-y-scroll custom-scrollbar space-y-4 p-4 pb-8 md:p-4  justify-between">
					{children}
				</div>
			</div>
		</div>
	)
}
