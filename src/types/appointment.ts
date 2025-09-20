export type Appointment = {
	id: string;
	patient_id: string;
	doctor_id: string;
	appointment_request_id: string;
	queue_number: number;
	status: "WAITING" | "CHECKED_IN" | "FINISHED" | "CANCELLED"; // thêm các trạng thái khác nếu có
	scheduled_at: string; // ISO Date string
	checked_in_at: string | null;
	finished_at: string | null;
	created_at: string; // ISO Date string
	updated_at: string; // ISO Date string
};
