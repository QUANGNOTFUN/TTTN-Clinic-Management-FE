import Link from "next/link";
import React from "react";

export type NavItemProps = {
	className?: string;
	item: {
		href: string;
		label: string;
		icon?: React.ReactNode;
	}
}

export function NavItem(
	props: NavItemProps
) {
	const { className, item } = props;
	
	return (
		<Link
			key={item.href}
			href={item.href}
			className={`${className} flex items-center gap-2`}
		>
			{item.icon && <span>{ item.icon }</span>}
			<span className={"hidden md:flex "}>{ item.label }</span>
		</Link>
	);
}