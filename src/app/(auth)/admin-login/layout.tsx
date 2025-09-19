import React from "react";

export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen bg-gray-50">
			<main className="flex min-h-screen">
				<div className="w-full ">
					{children}
				</div>
			</main>
		</div>
	);
}