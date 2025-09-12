'use client'

import {CircleArrowUpIcon} from "lucide-react";
import React from "react";

export function Sticky() {
	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};
	
	return (
		<button
			onClick={scrollToTop}
			className={"fixed bottom-6 right-6 z-50 bg-zinc-200 p-2 rounded-lg shadow-lg cursor-pointer hover:bg-zinc-300 transition-colors"}
			aria-label={"Scroll to top"}
		>
			<CircleArrowUpIcon className="w-6 h-6 text-zinc-800" />
		</button>
	);
}