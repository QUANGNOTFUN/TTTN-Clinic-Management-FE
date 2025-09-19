import Link from 'next/link'
import Image from 'next/image'
import {BookHeartIcon, CalendarPlusIcon, LibraryBigIcon, LogInIcon, User2Icon} from 'lucide-react'
import {useSession} from 'next-auth/react'
import {Button} from '@/components/ui/button'
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList
} from '@/components/ui/navigation-menu'
import {AuthButton} from '@/components/header/AuthButton'
import {useFindAllAppointmentRequestById} from "@/lib/hooks/appointment-request/useFindAllAppointmentRequestById";
import {usePathname} from "next/navigation";
import {CustomSession} from "@/types/login";

export default function DesktopHeader() {
	const { data: session } = useSession() as { data: CustomSession | null };
	const pathNameRouter = usePathname()
	const { data: appointmentRequest } = useFindAllAppointmentRequestById(session?.user.id);
	
	const lNavLinks = [
		{ href: '/doctor', label: 'Bác sĩ', icon: <User2Icon className="w-4 h-4 text-white" /> },
		{ href: '/booking', label: 'Đặt lịch khám', icon: <CalendarPlusIcon className="w-4 h-4 text-white" /> },
		{ href: '/health-tip', label: 'Tài liệu', icon: <LibraryBigIcon className="w-4 h-4 text-white" /> },
	]
	
	const rNavLinks = [
		{ href: '/appointment', label: 'Lịch hẹn', icon: <BookHeartIcon className="w-4 h-4 text-white" />, isDotIndicator: appointmentRequest },
	]
	
	return (
		<header className="fixed top-0 z-50 w-full bg-gradient-to-tr from-teal-700 via-teal-600 to-teal-500">
			<div className="flex items-center justify-between px-4 md:px-12 h-14">
				{/* Left Nav (Desktop) */}
				<div className="hidden md:flex flex-4">
					<NavigationMenu>
						<NavigationMenuList className="gap-3">
							{lNavLinks.map(link => {
								const isActive = pathNameRouter === link.href;
								return (
									<NavigationMenuItem key={link.href}>
										<NavigationMenuLink asChild>
											<Link
												href={link.href}
												className={`rounded-sm px-2 py-1.5 transition-all duration-200 hover:bg-transparent
													${isActive ? "border-t border-b-2 border-white/80" : "hover:bg-white/10 hover:scale-110"}
												`}
											>
												<span className="flex items-center gap-1.5 font-medium tracking-wide text-white">
													{link.icon}
													{link.label}
												</span>
											</Link>
										</NavigationMenuLink>
									</NavigationMenuItem>
								);
							})}
						</NavigationMenuList>
					</NavigationMenu>
				</div>
				
				{/* Logo Center */}
				<Link
					href="/"
					className="flex-2 flex items-center rounded-lg hover:scale-105 transition"
				>
					<div className="relative w-[90%] h-[48px] bg-white rounded-md shadow overflow-hidden">
						<Image
							src="/logo/logo.png"
							alt="Hola Doctor"
							fill
							className="object-contain "
							priority
						/>
					</div>
				</Link>
				
				{/* Right Auth */}
				<div className="flex-4 flex items-center justify-end gap-3">
					{/* Right Nav*/}
					<NavigationMenu>
						<NavigationMenuList className="gap-3">
							{rNavLinks.map(link => {
								const isActive = pathNameRouter === link.href;
								return (
									<NavigationMenuItem key={link.href}>
										<NavigationMenuLink asChild>
											<Link
												href={link.href}
												className={`relative rounded-sm px-2 py-1.5 transition-all duration-200 hover:bg-transparent
													${isActive ? "border-t border-b-2 border-white/80" : "hover:bg-white/10 hover:scale-110"}
												`}
											>
												<span className="flex items-center gap-1.5 font-semibold tracking-wide text-white">
													{link.icon}
													{link.label}
												</span>
												{link.isDotIndicator && (
													<span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3">
														<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
														<span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
													</span>
												)}
											</Link>
										</NavigationMenuLink>
									</NavigationMenuItem>
								);
							})}
						</NavigationMenuList>
					</NavigationMenu>
					{/* Auth */}
					<div className="hidden md:block">
						{!session?.user ? (
							<Button
								asChild
								variant="secondary"
								className="bg-white/10 hover:bg-white/20 text-white text-sm font-medium shadow-sm"
							>
								<Link href="/login" className="flex items-center gap-2">
									<LogInIcon className="w-4 h-4" />
									<span className="hidden md:inline">Đăng nhập</span>
								</Link>
							</Button>
						) : (
							<div className="flex items-center gap-2 bg-white/10 rounded-md px-2 py-1.5">
								<AuthButton />
								{session?.user && (
									<div className="text-sm font-semibold text-white/75">
										{session.user.email}
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	)
}
