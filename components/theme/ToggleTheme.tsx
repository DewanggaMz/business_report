"use client"

import { FaMoon } from "react-icons/fa"
import { IoSunny } from "react-icons/io5"
import { Button } from "../Fragments/Buttons"
import { useTheme } from "./ThemeContex"

export default function ToggleTheme() {
	const { theme, toggleTheme } = useTheme()

	return (
		<Button
			variant={"outline"}
			size={"icon"}
			className="hidden md:flex"
			onClick={toggleTheme}
		>
			{theme === "light" ? <FaMoon /> : <IoSunny />}
		</Button>
	)
}
