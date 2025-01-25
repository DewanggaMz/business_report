"use client"
import { Input, InputLabel } from "@/components/Fragments/Input"
import { Label } from "@/components/Fragments/Label"
import React, { useState } from "react"
import InputPassword from "./InputPassword"
import { ButtonSubmitLogin } from "./ButtonSubmit"
import Link from "next/link"
import { Separator } from "@/components/Fragments/Separator"
import { signIn } from "next-auth/react"
import { Validation } from "@/lib/validation/validate"
import { UserValidation } from "@/lib/validation/users.validation"
import { useRouter } from "next/navigation"

const FormLogin = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState("")
	const { push } = useRouter()

	const handleSubmit = async (e: any) => {
		e.preventDefault()
		setError("")
		setIsLoading(true)

		const dataLogin = {
			email: e.target.email.value,
			password: e.target.password.value,
		}
		const validateFields = Validation.validate(UserValidation.LOGIN, dataLogin)

		if (!validateFields.success) {
			setError("validate data error")
		}

		try {
			const response = await signIn("credentials", {
				email: validateFields.data.email,
				password: validateFields.data.password,
				callbackUrl: "/",
				redirect: false,
			})
			if (!response?.error) {
				e.target.reset()
				push("/")
				setIsLoading(false)
			} else {
				setIsLoading(false)
				if (response.status === 401) {
					setError("Email or password is incorrect")
				}
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			{error && (
				<div className="text-center bg-red-500/70 rounded-md p-2">
					<span className=" text-sm">{error}</span>
				</div>
			)}
			<form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
				<InputLabel type="email" name="email" id="email" label="Email" />
				<InputPassword title="Password" name="password" />
				<div className="flex justify-center">
					<ButtonSubmitLogin status={isLoading}>Login</ButtonSubmitLogin>
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
