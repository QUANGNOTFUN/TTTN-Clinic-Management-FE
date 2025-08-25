
import React from "react";
import {DoctorTableProps} from "@/app/(doctor)/_components/Layout/DoctorTable";
import {TablePagination, TablePaginationProps } from "@/app/(admin)/_components/Search&ActionTable/TablePagination";
import AdminTable from "@/app/(admin)/_components/Search&ActionTable/AdminTable";

interface AdminTableLayoutProps {
    tableProps: DoctorTableProps<unknown>;
    paginationProps: TablePaginationProps;
}
export default function DoctorTableLayout(
    {tableProps, paginationProps }: AdminTableLayoutProps
){
    return (
        <div className={"flex flex-col"}>
            <AdminTable headers={tableProps.headers} items={tableProps.items} action={tableProps.action} />
            <TablePagination state={{
                page: 0,
                limit: 0,
                total: 0,
            } } />

        </div>
    );
}