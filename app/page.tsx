import Modal from "@/components/ui/Modal/Modal"
import { Business } from "@/components/view/Home/Business"
import BusinessHeader from "@/components/view/Home/BusinessHeader"

export default function Home() {
	const dataValues = [20, 23, 1, 3, 4, 5, 6, 84, 23, 45, 56, 67]

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
			<Business data={dataBusiness} />
		</div>
	)
}
