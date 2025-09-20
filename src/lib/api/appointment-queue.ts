export const FIND_ALL_APPOINTMENT_BY_ID_API_URL = (patientId: string) =>
	`${process.env.NEXT_PUBLIC_API_URL}/appointments/findAll/${patientId}`;