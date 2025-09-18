export enum Shift {
	MORNING = 'MORNING',
	AFTERNOON = 'AFTERNOON',
	OVERTIME = 'OVERTIME',
}

export type DoctorSchedule = {
  id: string;
  doctor_id: string;
  date: string;
  shift: Shift;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}