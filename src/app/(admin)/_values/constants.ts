import {SidebarItem} from "@/app/(admin)/_components/organisms/sidebar/AdminSidebar";
import {BookMarked, ChartBar, Clock, Pill, UserRound, Users, Wrench} from "lucide-react";

export const ADMIN_SIDEBAR_ITEMS: SidebarItem[] = [
	// { title: 'Dashboard', href: '/admin-dashboard', icon: ChartBar },
	{ title: 'Danh sách bác sĩ', href: '/doctor-manage', icon: UserRound},
	// { title: 'Danh sách bệnh nhân', href: '/patient-manage', icon: Users },
	{ title: 'Danh sách thuốc', href: '/medication-manage', icon: Pill },
	// { title: 'Danh sách tài liệu', href: '/management/documents', icon: BookMarked },
	{ title: 'Lịch làm việc', href: '/schedule-manage', icon: Clock },
	// { title: 'Cài đặt', href: '/management/settings', icon: Wrench },
];