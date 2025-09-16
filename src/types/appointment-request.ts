export type CreateAppointmentRequestDto = {
	full_name: string;
	phone_number: string;
	patient_id: string;
	service_id: string;
	appointment_time: string;
};

export type Appointment = {
	id: string;
	full_name: string;
	phone_number: string;
	patient_id: string;
	service_id: string;
	appointment_time: string;
	status: string;
	created_at: string;
	updated_at: string;
}