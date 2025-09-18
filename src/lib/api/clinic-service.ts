export const FIND_ALL_SERVICES_API_URL = `${process.env.NEXT_PUBLIC_API_URL}clinicServices/findAll`;

export const CREATE_SERVICES_API_URL = `${process.env.NEXT_PUBLIC_API_URL}clinicServices/create`;

export const UPDATE_SERVICES_API_URL = (id: string) =>
	`${process.env.NEXT_PUBLIC_API_URL}clinicServices/update/${id}`;

export const DELETE_SERVICES_API_URL = (id: string) =>
	`${process.env.NEXT_PUBLIC_API_URL}clinicServices/delete/${id}`;