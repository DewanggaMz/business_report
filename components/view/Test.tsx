"use client"

import { FaBuildingUser } from "react-icons/fa6"
import { Button } from "@/components/Fragments/Buttons"
import LineChart from "@/components/ui/chart/LineChart"
import { formatToIDR } from "@/lib/utils"
import { signIn, useSession } from "next-auth/react"

const Test = () => {
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
	const dataValues = [20, 23, 1, 3, 4, 5, 6, 84, 23, 45, 56, 67]

	const { data: session, status } = useSession()

	console.log(session)
	console.log(status)

	return (
		<div>
			<div className="flex items-center justify-between">
				<h1 className="capitalize text-lg">My Businesses</h1>
				<Button
					className="bg-primary"
					onClick={() => {
						signIn()
					}}
				>
					Add New business
				</Button>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				<div className="bg-card  rounded-md p-3 space-y-4 text-sm relative">
					<div className="flex items-center justify-between border-b-2 border-acent2">
						<h2 className="text-base capitalize">
							name business test dewangga
						</h2>
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

export default Test
