export interface RegisterDoctorInput {
	full_name: string;
	email: string;
	password: string;
	gender: "MALE" | "FEMALE" | "OTHER";
	role: "DOCTOR";
}
