import FormRegister from "@/components/ui/(auth)/FormRegister"

const page = () => {
	return (
		<div className="flex justify-center items-center h-screen w-full p-4 overflow-auto">
			<div className="bg-card2 text-textForeground rounded-md min-h-40 w-[400px] p-4 space-y-3 shadow-lg">
				<div className="text-center font-medium text-xl">
					<h2>Register</h2>
				</div>
				<FormRegister />
			</div>
		</div>
	)
}

export default page
