import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {
	BellIcon,
	BookHeartIcon,
	CalendarPlusIcon,
	LibraryBigIcon,
	LogInIcon,
	LogOut,
	Menu,
	SquareUserRoundIcon,
	User2Icon,
} from "lucide-react";
import Link from "next/link";
import {signOut, useSession} from "next-auth/react";
import Image from "next/image";
import {DialogTitle} from "@radix-ui/react-dialog";
import {usePathname} from "next/navigation";
import {useFindAllAppointmentRequestById} from "@/lib/hooks/appointment-request/useFindAllAppointmentRequestById";
import {CustomSession} from "@/types/login";

export default function MobileHeader() {
	const { data: session } = useSession() as { data: CustomSession | null};
	const pathname = usePathname();
	const { data: appointmentRequest } = useFindAllAppointmentRequestById(session?.user.id);
	
	const tNavLinks = [
		{ href: "/doctor", label: "Bác sĩ", icon: <User2Icon className="w-5 h-5" /> },
		{ href: "/booking", label: "Đặt lịch khám", icon: <CalendarPlusIcon className="w-5 h-5" /> },
		{ href: "/health-tip", label: "Tài liệu", icon: <LibraryBigIcon className="w-5 h-5" /> },
	];
	const bNavLinks = [
		{ href: "/profile", label: "Trang cá nhân", icon: <SquareUserRoundIcon className="w-5 h-5" /> },
		{ href: "/appointment", label: "Lịch hẹn", icon: <BookHeartIcon className="w-5 h-5" />, isDotIndicator: appointmentRequest?.length > 0 },
		{ href: "/notifications", label: "Thông báo", icon: <BellIcon className="w-5 h-5" /> },
	];
	
	return (
		<div className="fixed top-0 left-0 w-full bg-gradient-to-r from-teal-600 to-teal-700 shadow-md z-50">
			<div className="flex items-center justify-between px-4 h-14">
				{/* Logo Center */}
				<Link
					href="/"
					className="flex items-center justify-center mx-auto hover:scale-105 transition"
				>
					<div className="relative h-10 w-[120px] bg-white rounded-md shadow overflow-hidden">
						<Image
							src="/logo/logo.png"
							alt="Hola Doctor"
							fill
							className="object-contain p-1"
							priority
						/>
					</div>
				</Link>
				
				{/* Mobile Trigger */}
				<Sheet>
					<SheetTrigger asChild>
						<Button variant="ghost" size="icon" className="text-white cursor-pointer">
							<Menu className="w-10 h-10" />
						</Button>
					</SheetTrigger>
					<SheetContent side="right" className="bg-zinc-50 text-teal-700 w-[70%] flex flex-col">
						{/* Nav Service */}
						<nav className="flex flex-col gap-2 mt-5 p-4">
							<DialogTitle className={"text-lg font-semibold"}>Dịch vụ</DialogTitle>
							{tNavLinks.map((link) => {
								const isActive = pathname === link.href;
								return (
									<Link
										key={link.href}
										href={link.href}
										className={`flex items-center gap-2 px-2 py-1.5 rounded-md font-medium transition
											${isActive ? "bg-teal-500 text-teal-50" : "hover:bg-teal-200"}
										`}
									>
										{link.icon}
										<span>{link.label}</span>
									</Link>
								);
							})}
						</nav>
						
						{/* Nav profile */}
						{ session?.user && (
							
							<div className="border-t border-teal/90 flex flex-col gap-2 p-4">
								<DialogTitle className={"text-lg font-semibold"}>Trang cá nhân</DialogTitle>
								
								{bNavLinks.map((link) => {
									const isActive = pathname === link.href;
									return (
										<Link
											key={link.href}
											href={link.href}
											className={`relative flex items-center gap-2 px-2 py-1.5 rounded-md font-medium transition
													${isActive ?  "bg-teal-500 text-teal-50" : "hover:bg-teal-200"}
													${link.isDotIndicator && "border border-teal-100"}
											`}
										>
											{link.icon}
											<span>{link.label}</span>
											
											{link.isDotIndicator && (
											<span className="absolute top-2 right-2 flex h-2.5 w-2.5">
												<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
												<span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
											</span>
											)}
										</Link>
									);
								})}
							</div>
						) }
						
						{/* Auth */}
						<div className="border-t border-teal/90 flex flex-col justify-self-end-safe gap-2 p-4">
							{!session?.user ? (
								<Link
									href="/login"
									className="flex items-center gap-2 px-2 py-1.5 rounded-md text-blue-400 font-semibold bg-blue-50 hover:bg-teal-50 transition"
								>
									<LogInIcon className="w-5 h-5" />
									Đăng nhập
								</Link>
							) : (
								<Button
									onClick={() => signOut()}
									variant="ghost"
									className="w-full justify-start gap-2 px-2 py-1.5 font-semibold text-red-500 hover:text-red-600 hover:bg-red-50 cursor-pointer"
								>
									<LogOut className="h-5 w-5" />
									Đăng xuất
								</Button>
							)}
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</div>
	);
}
