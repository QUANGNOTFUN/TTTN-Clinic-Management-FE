import TableSearch, {TableSearchProps} from "@/app/(admin)/_components/organisms/adminManagerTable/TableSearch";
import TableDropdownActions, {
	TableDropdownActionsProps
} from "@/app/(admin)/_components/organisms/adminManagerTable/TableDropdownActions";
import AdminTable, {AdminTableProps} from "@/app/(admin)/_components/organisms/adminManagerTable/AdminTable";
import React from "react";
import {TablePagination, TablePaginationProps} from "./TablePagination";
import DarkModeToggle from "@/components/toggles/DarkModeToogle";

interface AdminTableLayoutProps {
	searchProps: TableSearchProps;
	dropdownProps: TableDropdownActionsProps;
	tableProps: AdminTableProps<unknown>;
	paginationProps: TablePaginationProps;
}
export default function AdminTableLayout(
	{ searchProps, dropdownProps, tableProps, paginationProps }: AdminTableLayoutProps
){
	return (
			<div className={"flex flex-col"}>
				<div className={"flex justify-between mb-4"}>
					<TableSearch placeholder={searchProps.placeholder} onSearch={searchProps.onSearch} />
					{/*<DarkModeToggle />*/}
					<TableDropdownActions onItemSelected={dropdownProps.onItemSelected} />
				</div>

				<AdminTable headers={tableProps.headers} items={tableProps.items} action={tableProps.action} />
				<TablePagination state={{
            page: 1,
            limit: 20,
					total: 0,
        } } />
			</div>
	);
}