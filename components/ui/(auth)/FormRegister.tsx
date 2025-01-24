"use client"
import { Input } from "@/components/Fragments/Input"
import { Label } from "@/components/Fragments/Label"
import { Separator } from "@/components/Fragments/Separator"
import { registerUserCredentials } from "@/lib/service/users.service"
import Link from "next/link"
import React, { useActionState, useEffect, useState } from "react"
import InputPassword from "./InputPassword"
import ButtonSubmit from "./ButtonSubmit"

const FormRegister = () => {
	const [state, formAction] = useActionState(registerUserCredentials, null)
	const [formValues, setFormValues] = useState({
		fullname: "",
		username: "",
		email: "",
		phone: "",
		password: "",
		confirmPassword: "",
	})

	console.log(state)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormValues({ ...formValues, [name]: value })
	}

	useEffect(() => {
		if (state?.values) {
			setFormValues({
				fullname: state.values.fullname || "",
				username: state.values.username || "",
				email: state.values.email || "",
				phone: state.values.phone || "",
				password: state.values.password || "",
				confirmPassword: state.values.confirmPassword || "",
			})
		}
	}, [state])
	return (
		<>
			{state?.message && (
				<div className="text-center bg-red-500/70 rounded-md p-2">
					<span className=" text-sm">{state?.message}</span>
				</div>
			)}
			<form action={formAction} className="space-y-4">
				<div className="flex flex-col space-y-1">
					<Label htmlFor="fullname">Full Name</Label>
					<Input
						type="text"
						name="fullname"
						id="fullname"
						value={formValues.fullname}
						onChange={handleChange}
					/>
					<span className="text-red-500 text-sm">{state?.error.fullname}</span>
				</div>
				<div className="flex flex-col space-y-1">
					<Label htmlFor="username">Username</Label>
					<Input
						type="text"
						name="username"
						id="username"
						value={formValues.username}
						onChange={handleChange}
					/>
					<span className="text-red-500 text-sm">{state?.error.username}</span>
				</div>
				<div className="flex flex-col space-y-1">
					<Label htmlFor="email">Email</Label>
					<Input
						type="email"
						name="email"
						id="email"
						value={formValues.email}
						onChange={handleChange}
					/>
					<span className="text-red-500 text-sm">{state?.error.email}</span>
				</div>
				<div className="flex flex-col space-y-1">
					<Label htmlFor="phone">Phone</Label>
					<Input
						type="number"
						name="phone"
						id="phone"
						onChange={handleChange}
						value={formValues.phone}
						className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [moz-appearance:textfield]"
					/>
					<span className="text-red-500 text-sm">{state?.error.phone}</span>
				</div>
				<div>
					<div className="flex items-center justify-between gap-4">
						<InputPassword
							title="Password"
							name="password"
							value={formValues.password}
							onChange={handleChange}
						/>
						<InputPassword
							title="Confirm Password"
							name="confirmPassword"
							value={formValues.confirmPassword}
							onChange={handleChange}
						/>
					</div>
					<span className="text-red-500 text-sm">
						{state?.error.confirmPassword}
					</span>
				</div>

				<div className="flex justify-center">
					<ButtonSubmit>Register</ButtonSubmit>
				</div>

				<Separator className="w-4/6 m-auto bg-neutral-500" />
				<div className="flex items-center justify-center gap-2 text-sm">
					<span>Already have an account? </span>
					<Link href="/login" className="text-blue-500">
						Login
					</Link>
				</div>
			</form>
		</>
	)
}

export default FormRegister
