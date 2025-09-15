import {UserCircle} from "lucide-react";
import Link from "next/link";
import {signOut} from "next-auth/react";

export function AuthButton() {
	return (
		<div className="relative group">
			{/*Trigger Button*/}
			<Link
				href={"/profile"}
				className={
					"inline-flex items-center justify-center " +
					"gap-2 px-3 py-1.5 " +
					"rounded-md " +
					"text-sm font-medium text-white md:text-gray-300 md:hover:text-gray-900 " +
					"bg-teal-400 md:bg-gray-100/50 md:hover:bg-gray-200 " +
					"transition cursor-pointer"
				}
			>
				<UserCircle className="w-5 h-5" />
			</Link>
			
			{/*Dropdown Menu*/}
			<div className="absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-gray-200 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-150">
				<Link
					href={"/profile"}
					className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 rounded-t-md cursor-pointer"
				>
					Hồ sơ cá nhân
				</Link>
				<button
					onClick={() => signOut()}
					className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-300 rounded-b-md cursor-pointer"
				>
					Đăng xuất
				</button>
			</div>
		</div>
	);
}