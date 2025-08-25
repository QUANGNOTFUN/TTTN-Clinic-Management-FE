export type DoctorSchedule = {
	id: number;
	doctor_id: string;
	doctor: {
		user: {
			full_name: string;
		};
	};
	day: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
	shift: "MORNING" | "AFTERNOON" | "OVERTIME";
	start_time: string;
	end_time: string;
	is_available: boolean;
};

export type WeekDateInput = {
	start_week: string;
	end_week: string;
}

export type CreateDoctorScheduleInput = {
	doctor_id: string;
	week_count: number;
}

export type CreateDoctorScheduleData = {
	doctor_id: string;
	day: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';
	shift: 'MORNING' | 'AFTERNOON' | 'OVERTIME';
	is_available: boolean;
	date: string;
	week_count: number;
}

export type UpdateScheduleInput = {
	doctor_id: string;
	day: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';
	shift: 'MORNING' | 'AFTERNOON' | 'OVERTIME';
}