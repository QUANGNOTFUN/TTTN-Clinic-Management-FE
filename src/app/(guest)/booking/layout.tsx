import {ReactNode} from "react";
import Header from "@/components/header/Header";

export default function BookingLayout ({children}: {children: ReactNode}) {
	return (
		<div>
			<Header />
			<main className={"bg-gradient-to-r from-slate-400 to-gray-50"}>
				{children}
			</main>
		</div>
	);
}