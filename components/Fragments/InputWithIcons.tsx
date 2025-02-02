import React from "react"
import { Label } from "./Label"
import { Input } from "./Input"
import { Button } from "./Buttons"
import { EyeOff } from "lucide-react"

const InputWithIcons = ({
	title,
	type,
	name,
}: {
	title: string
	type: string
	name: string
}) => {
	return (
		<div className="flex flex-col space-y-1">
			<Label htmlFor={name} className="capitalize">
				{title}
			</Label>
			<div className="relative">
				<Input type={type} name={name} id={name} className="pr-10" />
				<Button
					variant={"ghost"}
					size={"icon"}
					className="absolute right-0 top-1/2 -translate-y-1/2"
					type="button"
				>
					<EyeOff size={16} />
				</Button>
			</div>
		</div>
	)
}

export default InputWithIcons
