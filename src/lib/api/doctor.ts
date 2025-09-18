export const FIND_ALL_DOCTORS_API_URL = `${process.env.NEXT_PUBLIC_API_URL}doctors/findAll`;

export const FIND_ONE_DOCTORS_API_URL = `${process.env.NEXT_PUBLIC_API_URL}doctors/findOne`;

export const CREATE_DOCTOR_API_URL = `${process.env.NEXT_PUBLIC_API_URL}doctors/create`;

export const UPDATE_DOCTOR_API_URL = (id: string) =>
	`${process.env.NEXT_PUBLIC_API_URL}doctors/update/${id}`;


export const DELETE_DOCTOR_API_URL = (id: string) =>
	`${process.env.NEXT_PUBLIC_API_URL}doctors/delete/${id}`;
