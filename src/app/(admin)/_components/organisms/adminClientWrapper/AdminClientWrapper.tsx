"use client";
import React, {useEffect, useState} from "react";
import AdminSidebar from "@/app/(admin)/_components/organisms/sidebar/AdminSidebar";
import {ADMIN_SIDEBAR_ITEMS} from "@/app/(admin)/_values/constants";
import ApolloWrapper from "@/components/apollo/ApolloWrapper";
import {ArrowLeftFromLine, ArrowRightFromLine} from "lucide-react";

interface AdminClientWrapperProps {
	children: React.ReactNode;
}

export default function AdminClientWrapper({ children }: AdminClientWrapperProps) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isLockedSidebar, setIsLockedSidebar] = useState<boolean>(false);
	const [windowWidth, setWindowWidth] = useState<number>(0);
	
	const handleResize = () => {
		setWindowWidth(window.innerWidth);
	}
	
	useEffect(() => {
		handleResize();
		window.addEventListener('resize', handleResize);
		
		if (windowWidth >= 1024) {
			setIsOpen(true);
		} else {
			setIsOpen(false);
		}
		
		return () => window.removeEventListener('resize', handleResize);
	}, [windowWidth]);
	
	return (
		<div className={"min-h-screen flex flex-row"}>
			
				<div className={`${isOpen ? "w-64" : "w-0"} fixed top-0 left-0 min-h-screen`}>
					{isOpen && (
						<AdminSidebar title={"Quản lí phòng khám"} items={ADMIN_SIDEBAR_ITEMS} isLocked={isLockedSidebar} onLockButton={setIsLockedSidebar}/>
					)}
					{!isLockedSidebar && (
						<button
							className={`absolute ${isOpen ? "inset-64" : "inset-0" } top-0 bottom-0 w-8 rounded-r-lg shadow-lg cursor-pointer bg-gray-50 dark:bg-zinc-800 text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-gray-400`} onClick={() => setIsOpen(!isOpen)}>
							{isOpen && !isLockedSidebar
								? <ArrowLeftFromLine className={"mx-auto"}/>
								: <ArrowRightFromLine className={"mx-auto"}/>
							}
						</button>
					)}
				</div>
			
			<main
				className={`${isOpen ? (isLockedSidebar ? "ml-64" : "ml-66") : "ml-6"} flex-1 outline outline-black/20 bg-zinc-700/5 dark:bg-zinc-900`}
				onClick={() => isLockedSidebar ? null : setIsOpen(false)}
			>
				<div className="container mx-auto p-8">
					<ApolloWrapper>
						{children}
					</ApolloWrapper>
				</div>
			</main>
		</div>
	);
}