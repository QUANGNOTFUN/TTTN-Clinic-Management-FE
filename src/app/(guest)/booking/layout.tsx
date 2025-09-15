import {ReactNode} from "react";

export default function BookingLayout ({children}: {children: ReactNode}) {
	return (
		<div>
			<main>
				{children}
			</main>
		</div>
	);
}