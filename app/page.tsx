import { Business } from "@/components/view/Home/Business"
import BusinessHeader from "@/components/view/Home/BusinessHeader"

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
			<BusinessHeader />
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				<Business data={dataBusiness} />
				<Business data={dataBusiness} />
				<Business data={dataBusiness} />
			</div>
			{/* <div className="flex items-center justify-center mt-4 text-neutral-600 dark:text-neutral-400">
				<h2 className="capitalize">no business</h2>
			</div> */}
		</div>
	)
}
