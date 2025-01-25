import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "./Label"
import type {
	InputHTMLAttributes,
	LabelHTMLAttributes,
	ForwardedRef,
} from "react"

export const Input = React.forwardRef<
	HTMLInputElement,
	React.ComponentProps<"input">
>(({ className, type, ...props }, ref) => {
	return (
		<input
			type={type}
			className={cn(
				"flex h-9 w-full rounded-md border border-neutral-500 bg-card px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
				type === "number"
					? "appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [moz-appearance:textfield]"
					: "",
				className
			)}
			ref={ref}
			{...props}
		/>
	)
})
Input.displayName = "Input"

interface InputLabelProps extends InputHTMLAttributes<HTMLInputElement> {
	id: string
	label: string
}

export const InputLabel = React.forwardRef<HTMLInputElement, InputLabelProps>(
	({ id, label, ...props }, ref) => {
		return (
			<div className="flex flex-col space-y-1">
				<Label htmlFor={id}>{label}</Label>
				<Input id={id} ref={ref} {...props} />
			</div>
		)
	}
)

InputLabel.displayName = "InputLabel"
