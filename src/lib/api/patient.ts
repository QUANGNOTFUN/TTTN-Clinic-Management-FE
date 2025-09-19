export const FIND_ONE_PATIENT = `${process.env.NEXT_PUBLIC_API_URL}patients/findOne`;

export const FIND_ALL_PATIENTS = `${process.env.NEXT_PUBLIC_API_URL}patients/findAll`;

export const UPDATE_PATIENT_API_URL = (id: string) =>
	`${process.env.NEXT_PUBLIC_API_URL}patients/update/${id}`;