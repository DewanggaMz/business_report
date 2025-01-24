"use client"
import { Input } from "@/components/Fragments/Input"
import { Label } from "@/components/Fragments/Label"
import React, { useActionState, useEffect, useRef, useState } from "react"
import InputPassword from "./InputPassword"
import ButtonSubmit from "./ButtonSubmit"
import Link from "next/link"
import { Separator } from "@/components/Fragments/Separator"
// import { loginUserCredentials } from "@/lib/service/users.service"
import { signIn } from "next-auth/react"
import { Validation } from "@/lib/validation/validate"
import { UserValidation } from "@/lib/validation/users.validation"

const FormLogin = () => {
	const [state, setState] = useState([])

	const handleSubmit = (e: any) => {
		e.preventDefault()
		const dataLogin = {
			email: e.target.email.value,
			password: e.target.password.value,
		}
		const validateFields = Validation.validate(UserValidation.LOGIN, dataLogin)
		// console.log(validateFields.error.flatten())

		// console.log(validateFields)
		// console.log(dataLogin)
		if (validateFields.error) {
			console.log(validateFields.error.flatten().fieldErrors)
			console.log(validateFields)
			setState(validateFields.validateFields.error.issues.path)

			console.log("tetstststs")
			console.log(state)
		}
	}

	// try {
	// 	// const response = await signIn("credentials", {
	// 	// 	email: formValues.email,
	// 	// 	password: formValues.password,
	// 	// 	redirectTo: "/",
	// 	// })
	// } catch (error) {}

	return (
		<>
			{/* {state?.message && (
				<div className="text-center bg-red-500/70 rounded-md p-2">
					<span className=" text-sm">{state?.message}</span>
				</div>
			)} */}
			<form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
				<div className="flex flex-col space-y-1">
					<Label htmlFor="email">Email</Label>
					<Input type="email" name="email" id="email" />
					{/* <span className="text-red-500 text-sm">{state?.error.email}</span> */}
				</div>
				<InputPassword title="Password" name="password" />

				<div className="flex justify-center">
					<ButtonSubmit>Login</ButtonSubmit>
				</div>

				<Separator className="w-4/6 m-auto bg-neutral-500" />
				<div className="flex items-center justify-center gap-2 text-sm">
					<span> Don&apos;t have an account?</span>
					<Link href="/register" className="text-blue-500">
						Register here
					</Link>
				</div>
			</form>
		</>
	)
}

export default FormLogin
