export type Patient = {
	user_id: string;
	full_name?: string | null;
	gender?: string | null;
	date_of_birth?: string | null;
	medical_history?: string | null;
	address?: string | null;
	phone_number?: string | null;
	blood_type?: string | null;
	emergency_contact?: string | null;
	insurance_number?: string | null;
	created_at?: string;
	updated_at?: string;
	user: {
		email: string;
	};
};
export type PatientUpdate = {
	full_name?: string;
	gender?: string;
	date_of_birth?: string;
	medical_history?: string;
	address?: string;
	phone_number?: string;
	blood_type?: string;
	emergency_contact?: string;
	insurance_number?: string;
}