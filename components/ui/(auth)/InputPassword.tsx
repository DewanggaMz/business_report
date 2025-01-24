import { Button } from "@/components/Fragments/Buttons"
import { Input } from "@/components/Fragments/Input"
import { Label } from "@/components/Fragments/Label"
import { Eye, EyeOff } from "lucide-react"
import React, { useState } from "react"

const InputPassword = ({
	title,
	name,
	value,
	onChange,
}: {
	title: string
	name: string
	value?: string
	onChange?: React.ChangeEventHandler<HTMLInputElement>
}) => {
	const [showPassword, setShowPassword] = useState(false)
	return (
		<div className="flex flex-col space-y-1">
			<Label htmlFor={name} className="capitalize">
				{title}
			</Label>
			<div className="relative">
				<Input
					type={showPassword ? "text" : "password"}
					name={name}
					id={name}
					className="pr-10"
					value={value}
					onChange={onChange}
				/>
				<Button
					variant={"ghost"}
					size={"icon"}
					onClick={() => setShowPassword(!showPassword)}
					className="absolute right-0 top-1/2 -translate-y-1/2"
					type="button"
				>
					{showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
				</Button>
			</div>
		</div>
	)
}

export default InputPassword
