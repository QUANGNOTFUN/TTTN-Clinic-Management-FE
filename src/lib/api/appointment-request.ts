export const FIND_ALL_APPOINTMENT_REQUEST_BY_DATE = (date: string) =>
	`${process.env.NEXT_PUBLIC_API_URL}/appointmentRequests/findAllByDate?date=${date}`;

export const FIND_ALL_APPOINTMENT_REQUEST_BY_ID_API_URL = (id: string) =>
	`${process.env.NEXT_PUBLIC_API_URL}/appointmentRequests/findAllById/${id}`;

export const FIND_ALL_APPOINTMENT_REQUEST_BY_SERVICE_API_URL = (id: string, date: string) =>
	`${process.env.NEXT_PUBLIC_API_URL}/appointmentRequests/findAllByService/${id}?date=${date}`;

export const CREATE_APPOINTMENT_REQUEST =
	`${process.env.NEXT_PUBLIC_API_URL}/appointmentRequests/create`;

export const CANCEL_APPOINTMENT_REQUEST = (id: string) =>
	`${process.env.NEXT_PUBLIC_API_URL}/appointmentRequests/cancel/${id}`;