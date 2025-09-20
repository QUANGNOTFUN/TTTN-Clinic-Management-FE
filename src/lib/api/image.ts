export const UPDATE_SERVICE_IMAGE_API_URL = (id: string) =>
	`${process.env.NEXT_PUBLIC_API_URL}images/service/${id}`

export const UPDATE_DOCTOR_IMAGE_API_URL = (id: string) =>
	`${process.env.NEXT_PUBLIC_API_URL}images/doctor/${id}`

export const UPDATE_PATIENT_IMAGE_API_URL = (id: string) =>
	`${process.env.NEXT_PUBLIC_API_URL}images/patient/${id}`

export const GET_IMAGE_API = (url_image: string) =>
	`${process.env.NEXT_PUBLIC_API_URL}${url_image}`