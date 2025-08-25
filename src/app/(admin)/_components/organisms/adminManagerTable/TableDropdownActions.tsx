import {ComponentType, useState} from "react";
import {BadgePlus, LucideProps, Pencil, SettingsIcon, Trash2, View} from "lucide-react";
import {ActionAdminTable} from "@/app/(admin)/_components/organisms/adminManagerTable/AdminTable";

interface DropdownItem {
	icon: ComponentType<LucideProps>;
	label: "Xem" | "Thêm" | "Sửa" | "Xóa";
	type?: ActionAdminTable["type"];
}

export interface TableDropdownActionsProps {
	icon?: ComponentType<LucideProps>;
	items?: DropdownItem[];
	onItemSelected?: (type: ActionAdminTable["type"]) => void;
}

export default function TableDropdownActions(
	{ onItemSelected }: TableDropdownActionsProps
) {
	const items: DropdownItem[] = [
		{ icon: View, label: 'Xem', type: "view" },
		{ icon: BadgePlus, label: "Thêm", type: "create" },
		{ icon: Pencil, label: "Sửa", type: "update" },
		{ icon: Trash2, label: "Xóa", type: "delete" },
	]

	const [isOpen, setIsOpen] = useState(false);

	const handleToggle = () => {
		setIsOpen(!isOpen)
	}
	const handleItemClick = (type: ActionAdminTable["type"]) => {
		if (onItemSelected) onItemSelected(type);
		setIsOpen(false);
	}

	return (
		<div className={"relative"}>
			<button
				onClick={handleToggle}
				className={"flex items-center justify-center w-12 h-12 outline outline-black/20 rounded-lg shadow-lg " +
					"bg-gray-50 hover:bg-violet-200 focus:bg-violet-200 text-gray-700  hover:text-violet-500 focus:text-violet-500  " +
					"dark:bg-gray-800 dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:text-gray-500 dark:hover:text-white dark:focus:text-white"}>
					<SettingsIcon className={"w-6 h-6"} />
			</button>
			{isOpen && (
				<div
					className={"absolute right-0 w-48 p-2 mt-2 outline outline-black/20 shadow-lg rounded-md z-50 " +
					"bg-gray-50 dark:bg-gray-700 dark:text-gray-200 "}
				>
					{items.map((item, index) => (
						<div
							key={index}
							className={"flex flex-row mt-2 px-4 py-2 cursor-pointer shadow-lg rounded-lg " +
								"outline outline-black/20 hover:outline-violet-500/80 dark:outline dark:outline-white/40 dark:hover:outline-white/80 " +
								"bg-white hover:bg-violet-200 text-gray-700 hover:text-violet-500/80 " +
					      "dark:bg-gray-800 dark:hover:bg-gray-600 dark:text-gray-300 dark:hover:text-white"}
							onClick={() => handleItemClick(item.type as ActionAdminTable["type"])}
						>
							{ item.icon && <item.icon className={"mr-2"} /> }
							{ item.label }
						</div>
					))}
				</div>
			)}
		</div>
	);
}