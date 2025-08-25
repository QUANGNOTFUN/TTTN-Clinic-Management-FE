import { AdminFormProps } from "@/app/(admin)/_components/organisms/create&UpdateForm/AdminForm";
import { CreateDoctorScheduleInput } from "@/types/doctorSchedule";
import { DoctorDisplay } from "@/types/doctors";

export const CREATE_DOCTOR_SCHEDULE_INPUT = (
	doctors: DoctorDisplay[]
): AdminFormProps<CreateDoctorScheduleInput> => {
	// Xử lý trường hợp doctors rỗng
	const doctorOptions = doctors.length > 0
		? doctors.map((doctor) => ({
			label: doctor.full_name || "Không xác định",
			value: doctor.id || "",
		}))
		: [{ label: "Không có bác sĩ", value: "", disabled: true }];
	
	return {
		title: "Tạo lịch làm việc",
		fields: [
			{
				label: "Bác sĩ",
				key: "doctor_id",
				type: "select",
				options: doctorOptions,
				required: true,
			},
			{
				label: "Số tuần liên tiếp",
				key: "week_count",
				type: "select",
				options: [
					{ label: "Tuần này", value: 1 },
					{ label: "2 tuần", value: 2 },
					{ label: "3 tuần", value: 3 },
					{ label: "4 tuần", value: 4 },
					{ label: "5 tuần", value: 5 },
				],
				required: true,
			},
		],
		submitLabel: "Tạo",
	};
};