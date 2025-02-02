"use client"

import { FaBuildingUser } from "react-icons/fa6"
import { Button } from "@/components/Fragments/Buttons"
import LineChart from "@/components/ui/chart/LineChart"
import { formatToIDR, getLast12Months } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

type BusinessProps = {
	data: {
		id: string
		name: string
		owners: string[]
		monthlyIncome: number
		annualIncome: number
		revenue: number[]
	}
}

const defaultData = {
	id: "",
	name: "empty",
	owners: [],
	monthlyIncome: 0,
	annualIncome: 0,
	revenue: Array(12).fill(0),
}

export const Business = ({ data = defaultData }: BusinessProps) => {
	const router = useRouter()
	const now = new Date().toLocaleDateString("id-ID").split("/").map(Number)
	const last12Months = getLast12Months(now[1], now[2])

	const handleDetails = () => {
		router.push(`/dashboard/business/${data.id}`)
	}

	return (
		<motion.div
			animate={{ y: 0, opacity: 1 }}
			initial={{ y: 60, opacity: 0 }}
			exit={{ y: -60, opacity: 0 }}
			transition={{ duration: 0.4 }}
			className="bg-card  rounded-md p-3 space-y-4 text-sm relative"
		>
			<div>
				<div className="flex items-center justify-between border-b-2 border-acent2">
					<h2 className="text-base capitalize">{data.name}</h2>
					<div className="space-x-2">
						<span className="hidden md:inline">ownership</span>
						<span>60%</span>
					</div>
					<div className="flex gap-2 items-center">
						<FaBuildingUser size={20} />
						<span className="font-medium">{data.owners.length}</span>
					</div>
				</div>
			</div>
			<div className="grid grid-cols-2 gap-4 capitalize">
				<motion.div
					animate={{ y: 0, opacity: 1 }}
					initial={{ y: -40, opacity: 0 }}
					transition={{ duration: 0.3, delay: 0.1 }}
					className=""
				>
					<h3>monthly net income</h3>
					<div className="flex items-center justify-between bg-acent2 p-2 rounded-md">
						<span>{formatToIDR(data.monthlyIncome)}</span>
					</div>
				</motion.div>
				<motion.div
					animate={{ y: 0, opacity: 1 }}
					initial={{ y: -40, opacity: 0 }}
					transition={{ duration: 0.3, delay: 0.13 }}
					className=""
				>
					<h3>annual net income</h3>
					<div className="flex items-center justify-between bg-acent2 p-2 rounded-md">
						<span>{formatToIDR(data.annualIncome)}</span>
					</div>
				</motion.div>
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
				<Button onClick={handleDetails} type="button">
					View Details
				</Button>
			</div>
		</motion.div>
	)
}
