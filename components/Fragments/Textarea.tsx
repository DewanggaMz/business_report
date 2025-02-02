import React from "react"

import { cn } from "@/lib/utils"
import { Label } from "./Label"

export const Textarea = React.forwardRef<
	HTMLTextAreaElement,
	React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
	return (
		<textarea
			className={cn(
				"flex min-h-[60px] w-full rounded-md border border-neutral-500 bg-card px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
				className
			)}
			ref={ref}
			{...props}
		/>
	)
})
Textarea.displayName = "Textarea"

interface TextareaLabelProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	id: string
	label: string
}

const TextareaLabel = React.forwardRef<HTMLTextAreaElement, TextareaLabelProps>(
	({ id, label, ...props }, ref) => {
		return (
			<div className="flex flex-col space-y-1">
				<Label htmlFor={id}>{label}</Label>
				<Textarea id={id} ref={ref} {...props} />
			</div>
		)
	}
)

TextareaLabel.displayName = "TextareaLabel"

export { TextareaLabel }
