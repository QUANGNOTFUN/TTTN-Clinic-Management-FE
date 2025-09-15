export type CreateAppointmentRequestDto = {
	full_name: string;
	phone_number: string;
	patient_id: string;
	service_id: string;
	appointment_time: string;
};

export type AppointmentRequest = {
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

export type AppointmentResponse = {
	message: string
	appointment: {
		id: string
		full_name: string
		phone_number: string
		patient_id: string
		service_id: string
		appointment_time: string
		status: string
		created_at: string
		updated_at: string
	}
}