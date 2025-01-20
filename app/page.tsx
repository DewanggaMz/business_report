import ToggleTheme from "@/components/theme/ToggleTheme"
import { SidebarDemo } from "./SidebarLayout"
import Navbar from "@/components/ui/Navbar"
import { FaBuildingUser } from "react-icons/fa6"
import { Button } from "@/components/Fragments/Buttons"
import LineChart from "@/components/ui/chart/LineChart"
import { formatToIDR } from "@/lib/utils"

export default function Home() {
	const labels = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Ags",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	]
	const dataValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

	return (
		<div className="bg-secondary rounded-lg h-[90vh] overflow-y-scroll custom-scrollbar space-y-4 p-4 pb-8 md:p-4  justify-between">
			<div className="flex items-center justify-between">
				<h1 className="capitalize text-lg">My Businesses</h1>
				<Button className="bg-primary">Add New business</Button>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				<div className="bg-card  rounded-md p-3 space-y-4 text-sm relative">
					<div className="flex items-center justify-between border-b-2 border-acent2">
						<h2 className="text-base">DGPayment</h2>
						<div className="flex gap-2 items-center">
							<FaBuildingUser size={20} />
							<span className="font-medium">2</span>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-4 capitalize">
						<div className="">
							<h3>monthly net income</h3>
							<div className="flex items-center justify-between bg-acent2 p-2 rounded-md">
								<span>{formatToIDR(0)}</span>
							</div>
						</div>
						<div className="">
							<h3>annual net income</h3>
							<div className="flex items-center justify-between bg-acent2 p-2 rounded-md">
								<span>{formatToIDR(0)}</span>
							</div>
						</div>
					</div>
					<div className="flex items-center justify-center min-h-64 w-full">
						<LineChart
							labels={labels}
							dataValues={dataValues}
							title="Revenue"
							label="IDR"
						/>
					</div>
					<div className="flex items-center justify-center">
						<Button>View Details</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
