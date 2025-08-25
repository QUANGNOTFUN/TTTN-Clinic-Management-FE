"use client"

import AdminTable from "@/app/(admin)/_components/organisms/adminManagerTable/AdminTable";
import TableSearch from "@/app/(admin)/_components/organisms/adminManagerTable/TableSearch";
import TableDropdownActions from "@/app/(admin)/_components/organisms/adminManagerTable/TableDropdownActions";
import {CircleEllipsis} from "lucide-react";

const headers = [
	{ label: "ID", key: "id" },
	{ label: "Tên Viết Tắt", key: "acronym" },
	{ label: "Tên Thuốc", key: "name" },
	{ label: "Số Lượng", key: "available_quantity" },
	{ label: "Giá Bán", key: "price" },
	{ label: "Cập Nhật", key: "action" },
];

export default function DoctorPage() {

	return (
		<div className={"flex flex-col"}>
			<div className={"flex justify-between mb-4"}>
				<TableSearch />

				<TableDropdownActions icon={CircleEllipsis} items={[
					{ icon: CircleEllipsis, label: "Thêm", onClick: () => console.log("ChevronDown clicked")},
					{ icon: CircleEllipsis, label: "Cập nhật", onClick: () => console.log("ChevronDown clicked")},
					{ icon: CircleEllipsis, label: "Xóa", onClick: () => console.log("ChevronDown clicked")},
				]} />
			</div>

			<AdminTable headers={headers} items={[
				{ "Thêm": "12" },
				{ "Cập nhât": "12" },
				{ "Xóa": "12" },
			]} />
		</div>
	)
}