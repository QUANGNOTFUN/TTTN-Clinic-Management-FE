import {ReactNode} from "react";

export default function BookingLayout ({children}: {children: ReactNode}) {
	return (
		<div>
			<main className={"bg-gradient-to-r from-slate-400 to-gray-50"}>
				{children}
			</main>
		</div>
	);
}