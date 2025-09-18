"use client";

import Link from "next/link";
import { LayoutDashboard, UserCog, Users, Calendar } from "lucide-react";

const links = [
	{ href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
	{ href: "/admin/doctors", label: "Bác sĩ", icon: UserCog },
	{ href: "/admin/patients", label: "Bệnh nhân", icon: Users },
	{ href: "/admin/appointments", label: "Lịch hẹn", icon: Calendar },
];

export default function AdminSidebarDesktop() {
	return (
		<aside className="hidden md:flex flex-col w-64 bg-white border-r h-screen shadow-sm">
			<div className="h-16 flex items-center px-6 font-bold text-lg border-b">
				Admin Panel
			</div>
			<nav className="flex-1 p-4 flex flex-col gap-2">
				{links.map(({ href, label, icon: Icon }) => (
					<Link
						key={href}
						href={href}
						className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-black"
					>
						<Icon className="h-5 w-5" />
						{label}
					</Link>
				))}
			</nav>
		</aside>
	);
}
