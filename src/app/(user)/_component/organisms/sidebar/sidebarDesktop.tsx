import { usePathname } from "next/navigation"
import Link from "next/link"
import {Bell, BookMarked, Calendar, Contact, LogOut} from "lucide-react"
import { signOut } from "next-auth/react"
import { useFindOnePatient } from "@/lib/hooks/patients/useFindOnePatient"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {GET_IMAGE_API} from "@/lib/api/image";

// Nav items
const navItems = [
	{ href: "/profile", label: "Thông tin cá nhân", icon: Contact },
	{ href: "/appointment-request", label: "Lịch hẹn", icon: Calendar },
	{ href: "/appointment", label: "Lịch khám", icon: BookMarked },
	{ href: "/notifications", label: "Thông báo", icon: Bell },
]

// Hàm tính số ngày từ created_at đến hôm nay
export function getAccountAge(createdAt?: string) {
	if (!createdAt) return ""
	const createdDate = new Date(createdAt)
	const now = new Date()
	const diffDays = Math.floor(
		(now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)
	)
	
	if (diffDays === 0) return "Tạo hôm nay"
	if (diffDays === 1) return "Tạo 1 ngày trước"
	return `${diffDays} ngày`
}

export default function SidebarDesktop() {
	const pathname = usePathname()
	const { data, isLoading, isError } = useFindOnePatient()
	
	if (isLoading || isError) return null

	return (
		<aside className="hidden md:flex fixed top-12 left-0 h-[calc(100vh-3rem)] w-[30vw] lg:w-[25vw] xl:w-[20vw] z-40 border-r bg-white">
			<Card className="w-full h-full flex flex-col rounded-none shadow-none border-0">
				{/* Header: User Info */}
				<CardHeader className="flex flex-row items-center gap-3">
					<Avatar className="w-10 h-10 lg:w-14 lg:h-14 border shadow-sm">
						<AvatarImage
							src={
								data?.avatar_url
									? GET_IMAGE_API(data?.avatar_url)
									: "/default-avatar.png"
							}
							className="w-full h-full object-cover rounded-full"
							alt="Avatar"
						/>
						<AvatarFallback>
							{data?.full_name?.charAt(0) ?? "?"}
						</AvatarFallback>
					</Avatar>
					<div>
						<p className="text-base lg:text-lg font-semibold text-gray-900">
							{data?.full_name}
						</p>
						<div className="flex items-center gap-1">
							<Avatar className={"w-8 h-8"}>
								<AvatarImage src={"/profile/levelAccount/1day.png"} alt={"LevelAccountIcon"} />
							</Avatar>
							
							<p className="text-xs lg:text-sm font-medium text-gray-500">
								{getAccountAge(data?.created_at)}
							</p>
						</div>
					
					</div>
				</CardHeader>
				
				{/* Nav Items */}
				<CardContent className="flex-1 space-y-2 pt-4 border-y">
					{navItems.map(({ href, label, icon: Icon }) => {
						const isActive = pathname === href
						return (
							<Link
								key={href}
								href={href}
								className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm lg:text-base font-medium tracking-wide transition ${
									isActive
										? "bg-gradient-to-r from-emerald-500 to-emerald-300 text-white shadow-sm"
										: "text-gray-700 hover:bg-gray-100 hover:text-emerald-600"
								}`}
							>
								<Icon className="h-5 w-5" />
								{label}
							</Link>
						)
					})}
				</CardContent>
				
				{/* Footer: Logout */}
				<CardFooter>
					<Button
						onClick={() => signOut()}
						variant="ghost"
						className="w-full justify-start gap-2 font-semibold text-red-500 hover:text-red-600 hover:bg-red-50 cursor-pointer"
					>
						<LogOut className="h-5 w-5" />
						Đăng xuất
					</Button>
				
				</CardFooter>
			</Card>
		</aside>
	)
}
