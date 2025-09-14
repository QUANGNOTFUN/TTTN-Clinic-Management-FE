import { useEffect, useState } from "react"
import { signOut } from "next-auth/react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
	Bell,
	Calendar,
	Contact,
	LogOut,
	PanelLeftClose,
	PanelLeftOpen,
} from "lucide-react"
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {useGetPatient} from "@/lib/hooks/patients/useGetPatient";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {getAccountAge} from "@/app/(user)/_component/organisms/sidebar/sidebarDesktop";

const navItems = [
	{ href: "/profile", label: "Thông tin cá nhân", icon: Contact },
	{ href: "/appointment", label: "Quản lý lịch hẹn", icon: Calendar },
	{ href: "/notifications", label: "Thông báo", icon: Bell },
]

export default function SidebarMobile() {
	const pathname = usePathname()
	const { loading, patient, error } = useGetPatient()
	
	const [isOpen, setIsOpen] = useState(false)
	
	useEffect(() => {
		if (typeof window === "undefined") return
		const handleResize = () => {
			if (window.innerWidth >= 768) {
				setIsOpen(false) // auto đóng khi về desktop
			}
		}
		window.addEventListener("resize", handleResize)
		return () => window.removeEventListener("resize", handleResize)
	}, [])
	
	if (loading || error) return null;

	return (
		<>
			{/* Toggle Button */}
			<Button
				onClick={() => setIsOpen(!isOpen)}
				size={"icon"}
				className="size-10 fixed md:hidden top-14 left-2  z-50 bg-white border hover:bg-gray-100"
			>
				{isOpen ? (
					<PanelLeftClose className="w-46 h-10 text-gray-700" />
				) : (
					<PanelLeftOpen className="w-10 h-10  text-gray-700" />
				)}
			</Button>
			
			{/* Overlay */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
					onClick={() => setIsOpen(false)}
				/>
			)}
			
			{/* Sidebar */}
			{isOpen && (
				<aside className="fixed top-14 left-14 w-[80vw] max-w-sm z-50">
					<Card className="h-[calc(60vh-3.5rem)] flex flex-col shadow-xl">
						<CardHeader className="flex flex-row items-center gap-3">
							<Avatar className="w-12 h-12 lg:w-14 lg:h-14 border shadow-sm">
								<AvatarImage src="/default-avatar.png" alt="Avatar" />
								<AvatarFallback>
									{patient?.full_name?.charAt(0) ?? "?"}
								</AvatarFallback>
							</Avatar>
							<div>
								<p className="text-base lg:text-lg font-semibold text-gray-900">
									{patient?.full_name}
								</p>
								<p className="text-xs lg:text-sm font-medium text-gray-500">
									{getAccountAge(patient?.created_at)}
								</p>
							
							</div>
						</CardHeader>
						
						<CardContent className="flex-1 pt-6 space-y-3 border">
							{navItems.map(({ href, label, icon: Icon }) => {
								const isActive = pathname === href
								return (
									<Link
										key={href}
										href={href}
										onClick={() => setIsOpen(false)}
										className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
											isActive
												? "bg-gradient-to-r from-emerald-500 to-emerald-300 text-white shadow-sm"
												: "text-gray-700 hover:bg-gray-100 hover:text-emerald-600"
										}`}
									>
										<Icon className="w-5 h-5" />
										<span>{label}</span>
									</Link>
								)
							})}
						</CardContent>
						
						{/* Footer */}
						<CardFooter>
							<Button
                                onClick={() => signOut()}
								variant="ghost"
								className="w-full justify-start gap-2 font-semibold text-red-500 hover:text-red-600 hover:bg-red-50"
							>
								<LogOut className="h-5 w-5" />
								Đăng xuất
							</Button>
						</CardFooter>
					</Card>
				</aside>
			)}
		</>
	)
}
