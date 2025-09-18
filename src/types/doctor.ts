export type Doctor = {
	user_id: string;
	full_name: string | null;
	gender: string | null;
	phone_number: string | null;
	specialty: string | null;
	rating: number | null;
	bio: string | null;
	avatar_url: string | null;
	created_at: string;
	updated_at: string;
	user: {
		email: string;
	};
};

export type CreateDoctorDto = {
	full_name: string;
	email: string;
	password: string;
}