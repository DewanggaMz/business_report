// "use client"

import { FaBuildingUser } from "react-icons/fa6"
import { Button } from "@/components/Fragments/Buttons"
import LineChart from "@/components/ui/chart/LineChart"
import { formatToIDR } from "@/lib/utils"
import { signIn, useSession } from "next-auth/react"
import Test from "@/components/view/Test"

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
	const dataValues = [20, 23, 1, 3, 4, 5, 6, 84, 23, 45, 56, 67]

	// const { data: session, status } = useSession()

	// console.log(session)
	// console.log(status)

	return (
		<>
			<Test />
		</>
	)
}
