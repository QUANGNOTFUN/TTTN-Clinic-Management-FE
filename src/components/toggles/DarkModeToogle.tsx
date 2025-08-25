"use client"

import useDarkMode from "@/libs/hooks/darkMode/useDarkMode";
import {Moon, Sun} from "lucide-react";

export default function DarkModeToggle() {
	const { isDarkMode, toggleDarkMode } = useDarkMode();

	return (
		<button
			onClick={toggleDarkMode}
			className={"flex items-center justify-center p-2 w-12 h-12 rounded-full " +
				"bg-gray-100 hover:bg-violet-200 hover:text-violet-500 " +
				"dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 dark:hover:text-white"}
			aria-label={isDarkMode ? "Dark Mode" : "Light Mode"}
		>
			{isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
		</button>
	)
}