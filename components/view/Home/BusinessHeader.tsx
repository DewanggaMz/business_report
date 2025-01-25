"use client"
import { Button } from "@/components/Fragments/Buttons"
import { InputLabel } from "@/components/Fragments/Input"
import { Label } from "@/components/Fragments/Label"
import Modal from "@/components/ui/Modal/Modal"
import { signIn, useSession } from "next-auth/react"

export const BusinessHeader = () => {
	const { data: session } = useSession()

	const handleClik = () => {
		if (!session) {
			signIn()
		}
		console.log("test")
	}

	return (
		<div className="flex items-center justify-between mb-4">
			<h1 className="capitalize text-lg">My Businesses</h1>
			<Button className="bg-primary" onClick={handleClik}>
				Add New business
			</Button>
			<Modal>
				<div className="w-96 space-y-4">
					<h1 className="text-xl font-medium capitalize text-center">
						Add new business
					</h1>
					<form action={""} className="space-y-4">
						<InputLabel
							id="name"
							type="text"
							name="name"
							label="Name of business"
							placeholder="business"
						/>
						<InputLabel
							id="address"
							type="text"
							name="address"
							label="Address"
							placeholder="Jl. example no. 123"
						/>
						<div className="flex flex-col space-y-1">
							<div className="flex justify-end items-end">
								<Button type="button">Add Owner</Button>
							</div>
							<div className="space-y-4">
								<div>
									<Label htmlFor="owners">Owner 1</Label>
									<div
										id="owners"
										className="bg-card border border-neutral-500 min-h-10 rounded-md p-3 space-y-4"
									>
										<InputLabel
											id="name"
											type="text"
											name={"name"}
											label="Email / Username"
											className="bg-card2"
										/>
										<InputLabel
											id="modal"
											type="number"
											name="modalOwner1"
											label="Initial Capital"
											className="bg-card2"
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="flex justify-center">
							<Button type="submit" className="w-2/5">
								Save
							</Button>
						</div>
					</form>
				</div>
			</Modal>
		</div>
	)
}

export default BusinessHeader
