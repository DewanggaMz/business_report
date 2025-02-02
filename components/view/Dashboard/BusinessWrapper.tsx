"use client"
import { getSession } from "next-auth/react"
import { Business } from "./Business"
import { useEffect, useState } from "react"
import { Session } from "next-auth"

const BusinessWrapper = () => {
	const [session, setSession] = useState<Session | null>(null)
	const [business, setBusiness] = useState([])

	useEffect(() => {
		const fetchSession = async () => {
			const session = await getSession()
			setSession(session)

			if (session?.user?.id) {
				const res = await fetch(`/api/business?id=${session?.user?.id}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				})

				const data = await res.json()
				setBusiness(data.data)
				console.log("business", data.data)
			}
		}

		fetchSession()
	}, [])

	console.log(business)

	const revenue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

	const dataBusiness = (idx: number) => {
		return {
			id: business[idx].id,
			name: business[idx].name,
			owners: business[idx].owners,
			monthlyIncome: business[idx].monthlyIncome,
			annualIncome: business[idx].annualIncome,
			revenue: revenue,
		}
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{business.map((b, idx) => (
				<Business key={b.name} data={dataBusiness(idx)} />
			))}
		</div>
	)
}

export default BusinessWrapper
