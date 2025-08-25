import {HeaderAdminTable} from "@/app/(admin)/_components/organisms/adminManagerTable/AdminTable";
import {CreateMedicationInput, UpdateMedicationInput} from "@/types/medications";
import {AdminFormProps} from "@/app/(admin)/_components/organisms/create&UpdateForm/AdminForm";

export const HEADER_TABLE_MEDICATION: HeaderAdminTable[] = [
	{ label: "ID", key: "id", type: "number" },
	{ label: "Tên Viết Tắt", key: "acronym", type: "text" },
	{ label: "Tên Thuốc", key: "name", type: "text" },
	{ label: "Số Lượng", key: "available_quantity", type: "number" },
	{ label: "Giá Bán", key: "price", type: "number" },
]

export const INIT_CREATE_MEDICATION_FORM: AdminFormProps<CreateMedicationInput> = {
	title: "Thêm mới thuốc",
	fields: [
		{ label: "Tên viết tắt", key: "acronym",  type: "text", required: true },
		{ label: "Tên thuốc", key: "name", type: "text", required: true },
		{ label: "Giá bán", key: "price",  type: "number", required: true },
		{ label: "Số lượng hiện có", key: "available_quantity", type: "number", required: true }
	],
	submitLabel: "Tạo"
}

export const INIT_UPDATE_MEDICATION_FORM: AdminFormProps<UpdateMedicationInput> = {
	title: "Cập nhật thuốc",
	fields: [
		{ label: "Tên viết tắt", key: "acronym",  type: "text", required: false },
		{ label: "Tên thuốc", key: "name", type: "text", required: false },
		{ label: "Giá bán", key: "price",  type: "number", required: false },
		{ label: "Số lượng hiện có", key: "available_quantity", type: "number", required: false }
	],
	submitLabel: "Cập nhật"
}