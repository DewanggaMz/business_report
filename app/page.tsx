// "use client"
import Navbar from "@/components/ui/Navbar/Navbar"

export default function Home() {
	return (
		<div className="">
			<Navbar />
			<h1>Home</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
		</div>
	)
}
