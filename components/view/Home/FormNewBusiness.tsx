import React from "react"
import { useSession } from "next-auth/react"
import { useEffect, useMemo, useState } from "react"
import { InputLabel } from "@/components/Fragments/Input"
import { Label } from "@/components/Fragments/Label"
import { TextareaLabel } from "@/components/Fragments/Textarea"
import { Button } from "@/components/Fragments/Buttons"
import { Separator } from "@/components/Fragments/Separator"
import Swal from "sweetalert2"
import { notify } from "@/lib/notify/notify"

type Owner = {
	id: number
	owner: string
	initialCapital: string
}

const FormNewBusiness = ({
	setIsOpen,
}: {
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
	const { data: session } = useSession()
	const stableSession = useMemo(() => session, [session])
	const [isLoading, setIsLoading] = useState(false)
	const [state, setState] = useState<{
		data?: any
		error?: any
		message: string
		status: number
	}>()
	const [owners, setOwners] = useState<Owner[]>([
		{
			id: 1,
			owner: "",
			initialCapital: "",
		},
	])

	const addOwner = () => {
		const id = owners[owners.length - 1].id + 1
		const newOwner = {
			id: id,
			owner: "",
			initialCapital: "",
		}
		setOwners((prevOwners) => [...prevOwners, newOwner])
	}

	const updateOwner = ({
		id,
		owner = "",
		initialCapital = "",
	}: {
		id: number
		owner: string
		initialCapital?: string
	}) => {
		setOwners((prevOwners) =>
			prevOwners.map((ownr) => {
				if (ownr.id === id) {
					return { ...ownr, owner, initialCapital }
				}
				return ownr
			})
		)
	}
	const removeField = (id: number) => {
		setOwners((prevFields) => prevFields.filter((field) => field.id !== id))
	}

	useEffect(() => {
		if (!stableSession) return
		updateOwner({
			id: 1,
			owner: stableSession.user?.email || stableSession.user?.name || "",
		})
	}, [stableSession])

	const checkDuplicateOwner = owners.reduce((acc: any, item: any) => {
		acc[item.owner] = (acc[item.owner] || 0) + 1
		return acc
	}, {})
	const duplicates = Object.keys(checkDuplicateOwner).filter(
		(owner) => checkDuplicateOwner[owner] > 1
	)

	const handleSubmit = async (e: any) => {
		e.preventDefault()

		if (duplicates.length > 0) {
			Swal.fire({
				title: "Error!",
				text: `Duplicate owners: ${duplicates.join(", ")}`,
				icon: "error",
				confirmButtonText: "OK",
			})
			return
		}

		const dataForm = {
			name: e.target.name.value,
			address: e.target.address.value,
			description: e.target.description.value,
			owners: owners.map((owner) => ({
				owner: owner.owner,
				initialCapital:
					owner.initialCapital === "" ? "0" : owner.initialCapital,
			})),
		}

		try {
			setIsLoading(true)
			const res = await fetch("/api/business", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(dataForm),
			})

			const data = await res.json()
			if (!res.ok) {
				setState(data)
				notify({
					type: "error",
					message: "Failed to create business",
				})
				setIsLoading(false)

				return
			}
			notify({
				type: "success",
				message: "Business created successfully",
			})

			setIsOpen(false)
			setIsLoading(false)
		} catch (error) {
			setIsLoading(false)
			notify({
				type: "error",
				message: "Failed to process request",
			})
		}
	}

	return (
		<form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
			<InputLabel
				id="name"
				type="text"
				name="name"
				label="Name Business *"
				placeholder="business"
				messageError={state?.error.name}
				required
				withError
			/>
			<InputLabel
				id="address"
				type="text"
				name="address"
				label="Address *"
				placeholder="Jl. example no. 123"
				required
				messageError={state?.error.address}
				withError
			/>
			<TextareaLabel
				id="description"
				name="description"
				label="Description"
				placeholder="Description"
				className="max-h-52 min-h-24 custom-scrollbar"
			/>
			<div className="flex flex-col space-y-4">
				<div className="space-y-4">
					{owners.map((owner, index) => (
						<div key={index}>
							<Label htmlFor="owners">Owner {index + 1}</Label>
							<div
								id="owners"
								className="bg-card border border-neutral-500 min-h-10 rounded-md p-3 space-y-4"
							>
								<InputLabel
									id={`owner-${owner.id}`}
									type="text"
									name="owner"
									label="Email / Username"
									className="bg-card2"
									placeholder="email@example.com"
									value={owner.owner}
									onChange={(e) =>
										updateOwner({
											id: owner.id,
											owner: e.target.value,
											initialCapital: owner.initialCapital,
										})
									}
								/>
								<InputLabel
									id={`initialCapital-${owner.id}`}
									type="number"
									name="initialCapital"
									label="Initial Capital"
									className="bg-card2"
									placeholder="100000"
									value={owner.initialCapital}
									onChange={(e) =>
										updateOwner({
											id: owner.id,
											initialCapital: e.target.value,
											owner: owner.owner,
										})
									}
								/>
								<div className="flex justify-end">
									{owners.length > 1 && (
										<Button
											type="button"
											onClick={() => removeField(owner.id)}
											variant={"destructive"}
										>
											Remove
										</Button>
									)}
								</div>
							</div>
						</div>
					))}
				</div>
				<div className="flex justify-end items-start">
					<Button type="button" onClick={addOwner}>
						Add Owner
					</Button>
				</div>
			</div>
			<Separator className="w-4/6 m-auto bg-neutral-500" />
			<div className="flex justify-center">
				<Button type="submit" className="w-2/5" disabled={isLoading}>
					Save
				</Button>
			</div>
		</form>
	)
}

export default FormNewBusiness
