export const CREATE_DOCTOR_SCHEDULE =
	`${process.env.NEXT_PUBLIC_API_URL}doctorSchedules/create`;

export const FIND_ALL_BY_DATE = (date: string) =>
	`${process.env.NEXT_PUBLIC_API_URL}doctorSchedules/findAllByDate/${date}`;