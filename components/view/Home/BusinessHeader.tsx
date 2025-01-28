"use client"
import { Button } from "@/components/Fragments/Buttons"
import { Separator } from "@/components/Fragments/Separator"
import Modal from "@/components/ui/Modal/Modal"
import { signIn, useSession } from "next-auth/react"
import FormNewBusiness from "./FormNewBusiness"
import { ArrowLeftToLine } from "lucide-react"
import { useState } from "react"

export const BusinessHeader = () => {
	const { data: session } = useSession()
	const [isOpenModal, setIsOpenModal] = useState(false)

	const handleAddNewBusiness = () => {
		if (!session) {
			signIn()
		} else {
			setIsOpenModal(true)
		}
	}

	return (
		<div className="flex items-center justify-between mb-4">
			<h1 className="capitalize text-lg">My Businesses</h1>
			<Button className="bg-primary" onClick={handleAddNewBusiness}>
				Add New business
			</Button>
			<Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal}>
				<div className="w-96 space-y-4">
					<Button
						type="button"
						variant={"destructive"}
						size={"icon"}
						className="absolute top-3 left-3 "
						onClick={() => setIsOpenModal(false)}
					>
						<ArrowLeftToLine />
					</Button>
					<div className="pt-2">
						<h1 className="text-xl font-medium capitalize text-center">
							Add new business
						</h1>
						<Separator className="w-4/6 m-auto bg-neutral-500" />
					</div>
					<FormNewBusiness setIsOpen={setIsOpenModal} />
				</div>
			</Modal>
		</div>
	)
}

export default BusinessHeader
