export const CREATE_DOCTOR_SCHEDULE =
	`${process.env.NEXT_PUBLIC_API_URL}doctorSchedules/create`;

export const FIND_ALL_BY_WEEK_API_URL = (date: string) =>
	`${process.env.NEXT_PUBLIC_API_URL}doctorSchedules/findAllByWeek?date=${date}`;

export const FIND_ONE_BY_WEEK_API_URL = (id: string, date: string) =>
	`${process.env.NEXT_PUBLIC_API_URL}doctorSchedules/findOneByWeek/${id}?date=${date}`;

export const DELETE_DOCTOR_SCHEDULE = (scheduleId: string) =>
	`${process.env.NEXT_PUBLIC_API_URL}doctorSchedules/delete/${scheduleId}`;