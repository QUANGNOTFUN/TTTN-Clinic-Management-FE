import {HeaderAdminTable} from "@/app/(admin)/_components/organisms/adminManagerTable/AdminTable";
import {AdminFormProps} from "@/app/(admin)/_components/organisms/create&UpdateForm/AdminForm";
import {UpdateDoctorInput} from "@/types/doctors";
import {RegisterDoctorInput} from "@/types/register";

export const HEADER_TABLE_DOCTOR: HeaderAdminTable[] = [
	{ label: "ID", key: "id" },
	{ label: "Email", key: "email" },
	{ label: "Họ và tên", key: "full_name" },
	{ label: "Số điện thoại", key: "phone" },
	{ label: "Địa chỉ", key: "address" },
	{ label: "Giới tính", key: "gender" },
	{ label: "Ngày sinh", key: "date_of_birth" },
	{ label: "Chứng chỉ", key: "qualifications" },
	{ label: "thâm niên làm việc", key: "work_seniority" },
	{ label: "Chuyên ngành", key: "specialty" },
	{ label: "Nơi làm việc", key: "hospital" },
]

export const INIT_CREATE_DOCTOR_FORM: AdminFormProps<RegisterDoctorInput> = {
	title: "Thêm tài khoản bác sĩ",
	fields: [
		{ label: "Họ và tên", key: "full_name",  type: "text", required: true },
		{ label: "Email", key: "email", type: "text", required: true },
		{ label: "Mật khẩu", key: "password",  type: "password", required: true },
		{ label: "Giới tính", key: "gender",  type: "select",
			options: [
				{ label: "Nam", value: "MALE" },
				{ label: "Nữ", value: "FEMALE" },
				{ label: "Bí mật", value: "OTHER" },
			],
			required: true },
		{ label: "Role", key: "role",  type: "select", options: [{ label: "Bác sĩ", value: "DOCTOR" }], required: true },
	],
	submitLabel: "Tạo"
};


export const INIT_UPDATE_DOCTOR_FORM: AdminFormProps<UpdateDoctorInput> = {
	title: "Cập nhật bác sĩ",
	fields: [
		{ label: "Họ và tên", key: "full_name",  type: "text" },
		{ label: "Email", key: "email", type: "text" },
		{ label: "Giới tính", key: "gender",  type: "select",
			options: [
				{ label: "Nam", value: "MALE" },
				{ label: "Nữ", value: "FEMALE" },
				{ label: "Bí mật", value: "OTHER" },
			],
		},
		{ label: "Bằng cấp", key: "qualifications", type: "text" },
		{ label: "Kinh nghiệm", key: "work_seniority", type: "number" },
		{ label: "Chuyên khoa", key: "specialty", type: "text" },
		{ label: "Bệnh viện", key: "hospital", type: "text" },
	],
	submitLabel: "Cập nhật"
}