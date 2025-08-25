import {useEffect, useState} from "react";
import {formatNumberWithCommas} from "@/libs/function/formatNumberWithCommas";
import {ColumnDef, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";

export interface HeaderAdminTable {
	label: string;
	key: string;
	type?: "text" | "number" | "date";
}

export interface ActionAdminTable {
	type:  "view" | "create" | "update" | "delete"; // action for a type of table
	onClick?: (item: unknown) => void; // callback for action when click button
}

export interface AdminTableProps<T> {
	headers: HeaderAdminTable[]; // headers for table
	items: T[]; // items for table
	action: ActionAdminTable; // action for table
}

const AdminTable = <T,>(
	{ headers, items, action }: AdminTableProps<T>
) => {
	const [isUpdate, setIsUpdate] = useState(false);
	const [isDelete, setIsDelete] = useState(false);
	const [tableData, setTableData] = useState<T[]>(items);

	useEffect(() => {
		setIsUpdate(action.type === "update");
		setIsDelete(action.type === "delete");
		setTableData(items);
	}, [action, items]);
	
	const columns: ColumnDef<T>[] = [
		...headers.map((header) => ({
			header: header.label,
			accessorKey: header.key,
			cell: (info) => {
				const value = info.getValue();
				return (
					<span className={"truncate"}>
						{renderCellValue(value, header.type)}
					</span>
				);
			}
		})),
		...(isUpdate || isDelete
			? [{
					header: "Hành động",
					id: "action",
					cell: (info) => {
						const item = info.row.original;
						return (
							<button
								onClick={() => action.onClick && action.onClick(item[headers[0].key as keyof T])}
								className={"container p-2 rounded-xl shadow-md outline outline-violet-500 dark:outline dark:outline-white/40 bg-zinc-50 hover:bg-violet-300  hover:text-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:text-gray-100"}
							>
								{ isUpdate ? "Cập nhật" : "Xóa" }
							</button>
						);
					}
				}] : []),
	];
	
	const renderCellValue = (value: unknown, type?: "text" | "number" | "date") => {
		if (value == null) return "N/A";
		if (type === "number" && typeof value === "number") {
			return formatNumberWithCommas(String(value));
		}
		if (type === "date") {
			return new Date(value as string).toLocaleDateString();
		}
		return String(value);
	}
	
	const table = useReactTable({
		data: tableData,
		columns,
		getCoreRowModel: getCoreRowModel(),
	})

	return (
		<div className={"container mx-auto overflow-auto dark:outline dark:outline-white shadow-lg rounded-t-xl"}>
			<table className={
				"table-auto border-collapse min-w-full shadow-md " +
				"text-xs md:text-sm lg:text-base font-medium text-zinc-950 dark:text-gray-200 "
			}>
				<thead className={"bg-violet-300 text-gray-900 dark:bg-gray-900 dark:text-gray-300"}>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th
									key={header.id}
									className="w-auto p-4 text-center truncate border-1 border-violet-200"
								>
									{flexRender(header.column.columnDef.header, header.getContext())}
									{{
										asc: " 🔼",
										desc: " 🔽",
									}[header.column.getIsSorted() as string] ?? null}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id}
						    className={"bg-white hover:bg-violet-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200" }
						>
							{row.getVisibleCells().map((cell) => (
								<td key={cell.id}
								    className="py-2 px-4 border border-gray-300 text-center text-xs md:text-base hover:bg-violet-200 dark:hover:bg-gray-600 dark:hover:text-white"
								>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default AdminTable;