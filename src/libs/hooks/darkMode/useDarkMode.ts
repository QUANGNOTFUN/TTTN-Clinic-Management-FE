"use client";

import {useEffect, useState} from "react";

export default function useDarkMode() {
	const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
		if (typeof window !== "undefined") {
			const saved = localStorage.getItem("darkMode");
			if (saved) return saved === "true";
			return window.matchMedia("(prefers-color-scheme: dark)").matches;
		}
		return false;
	});

	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add("dark");
			localStorage.setItem("darkMode", "true");
		} else {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("darkMode", "false");
		}
	}, [isDarkMode]);

	const toggleDarkMode = () => {
		setIsDarkMode(!isDarkMode);
	}

	return {isDarkMode, toggleDarkMode};
}