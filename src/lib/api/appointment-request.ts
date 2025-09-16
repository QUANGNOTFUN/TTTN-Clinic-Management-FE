export const FIND_ALL_APPOINTMENT_REQUEST = `${process.env.NEXT_PUBLIC_API_URL}appointmentRequests/findAll`;

export const CREATE_APPOINTMENT_REQUEST = `${process.env.NEXT_PUBLIC_API_URL}appointmentRequests/create`;

export const CANCEL_APPOINTMENT_REQUEST = (id: string) => `${process.env.NEXT_PUBLIC_API_URL}appointmentRequests/cancel/${id}`;