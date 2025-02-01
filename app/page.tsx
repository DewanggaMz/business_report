// "use client"
import Navbar from "@/components/ui/Navbar/Navbar"
import { Business } from "@/components/view/Dashboard/Business"
import BusinessHeader from "@/components/view/Dashboard/BusinessHeader"
// import { getSession } from "next-auth/react"
// import { useEffect } from "react"

export default function Home() {
	const dataValues = [
		0, 0, 0, 0, 0, 0, 0, 0, 10000000, 20000000, 30000000, 50000000,
	]

	const dataBusiness = {
		name: "dewangga",
		owners: 5,
		monthlyIncome: 5000000,
		annualIncome: 50000000,
		revenue: dataValues,
	}

	return (
		<div className="">
			<Navbar />
			{/* <BusinessHeader /> */}
			<h1>Home</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{/* <Business data={dataBusiness} /> */}
				{/* <Business data={dataBusiness} /> */}
				{/* <Business data={dataBusiness} /> */}
			</div>
			{/* <div className="flex items-center justify-center mt-4 text-neutral-600 dark:text-neutral-400">
				<h2 classNam
				e="capitalize">no business</h2>
			</div> */}
		</div>
	)
}
