"use client"
import { InputLabel } from "@/components/Fragments/Input"
import React, { useActionState } from "react"
import InputPassword from "./InputPassword"
import { ButtonSubmitLogin } from "./ButtonSubmit"
import Link from "next/link"
import { Separator } from "@/components/Fragments/Separator"
import { loginUserCredentials } from "@/lib/actions/users.action"

const FormLogin = () => {
	const [state, formAction] = useActionState(loginUserCredentials, null)

	return (
		<>
			{state?.message && (
				<div className="text-center bg-red-500/70 rounded-md p-2">
					<span className=" text-sm">{state.message}</span>
				</div>
			)}
			<form action={formAction} className="space-y-4">
				<InputLabel
					type="email"
					name="email"
					id="email"
					label="Email"
					withError
					messageError={state?.error?.email}
					required
				/>
				<div className="flex flex-col space-y-1">
					<InputPassword title="Password" name="password" />
					<span className="text-red-500 text-sm">{state?.error?.password}</span>
				</div>
				<div className="flex justify-center">
					<ButtonSubmitLogin>Login</ButtonSubmitLogin>
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
