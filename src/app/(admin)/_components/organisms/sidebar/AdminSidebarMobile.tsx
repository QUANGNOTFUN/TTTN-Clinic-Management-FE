"use client";

import Link from "next/link";
import { Menu, LayoutDashboard, UserCog, Users, Calendar } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const links = [
	{ href: "/admin-dashboard", label: "Dashboard", icon: LayoutDashboard },
	{ href: "/doctor-manage", label: "Bác sĩ", icon: UserCog },
	{ href: "/patient-manage", label: "Bệnh nhân", icon: Users },
	{ href: "/schedule-manage", label: "Lịch hẹn", icon: Calendar },
];

export default function AdminSidebarMobile() {
	return (
		<div className="md:hidden">
			<Sheet>
				<SheetTrigger asChild>
					<Button variant="ghost" size="icon" className={"cursor-pointer"}>
						<Menu className="h-6 w-6" />
					</Button>
				</SheetTrigger>
				<SheetContent side="left" className="p-4">
					<div className="font-bold text-lg mb-6">Admin Panel</div>
					<nav className="flex flex-col gap-3">
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
				</SheetContent>
			</Sheet>
		</div>
	);
}
