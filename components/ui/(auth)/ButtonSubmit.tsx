"use client"
import { Button } from "@/components/Fragments/Buttons"
import { useFormStatus } from "react-dom"

const ButtonSubmit = ({ children }: { children: React.ReactNode }) => {
	const { pending } = useFormStatus()
	return (
		<Button type="submit" className="w-2/5" disabled={pending}>
			{children}
		</Button>
	)
}

export default ButtonSubmit
