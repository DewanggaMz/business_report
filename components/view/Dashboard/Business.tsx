"use client"

import { FaBuildingUser } from "react-icons/fa6"
import { Button } from "@/components/Fragments/Buttons"
import LineChart from "@/components/ui/chart/LineChart"
import { formatToIDR, getLast12Months } from "@/lib/utils"
import { signIn, useSession } from "next-auth/react"

type BusinessProps = {
	data: {
		name: string
		owners: number
		monthlyIncome: number
		annualIncome: number
		revenue: number[]
	}
}

export const Business = ({ data }: BusinessProps) => {
	const now = new Date().toLocaleDateString("id-ID").split("/").map(Number)
	const last12Months = getLast12Months(now[1], now[2])

	return (
		<div className="bg-card  rounded-md p-3 space-y-4 text-sm relative">
			<div className="flex items-center justify-between border-b-2 border-acent2">
				<h2 className="text-base capitalize">name business test dewangga</h2>
				<div className="flex gap-2 items-center">
					<FaBuildingUser size={20} />
					<span className="font-medium">{data.owners}</span>
				</div>
			</div>
			<div className="grid grid-cols-2 gap-4 capitalize">
				<div className="">
					<h3>monthly net income</h3>
					<div className="flex items-center justify-between bg-acent2 p-2 rounded-md">
						<span>{formatToIDR(data.monthlyIncome)}</span>
					</div>
				</div>
				<div className="">
					<h3>annual net income</h3>
					<div className="flex items-center justify-between bg-acent2 p-2 rounded-md">
						<span>{formatToIDR(data.annualIncome)}</span>
					</div>
				</div>
			</div>
			<div className="flex items-center justify-center min-h-64 w-full">
				<LineChart
					labels={last12Months}
					dataValues={data.revenue}
					title="Revenue"
					label="IDR"
				/>
			</div>
			<div className="flex items-center justify-center">
				<Button>View Details</Button>
			</div>
		</div>
	)
}
