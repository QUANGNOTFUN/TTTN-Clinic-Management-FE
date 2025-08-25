import React, {ChangeEvent} from "react";
import {Search} from "lucide-react";


export interface TableSearchProps {
	placeholder?: string;
	onSearch?: (term: string) => void;
}

export default function TableSearch(
	{ placeholder , onSearch }: TableSearchProps
) {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (onSearch) onSearch(e.target.value)
	}

	return (
		<div className="relative">
			<div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
				<Search />
			</div>
			<input
				type="text"
				id="table-search-users"
				className="block py-3 ps-10 rounded-md w-90
					text-xs sm:text-sm lg:text-base
					bg-gray-50 shadow-xl hover:border-gray-800 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 text-gray-900 border border-gray-300
					dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				placeholder={placeholder}
				onChange={handleChange}
			/>
		</div>
	);
}