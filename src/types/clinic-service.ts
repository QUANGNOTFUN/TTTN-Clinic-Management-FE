export type ClinicService = {
	id: string;
	name: string;
	description?: string;
	price?: number;
	duration_minutes?: number;
	image_url?: string;
	requires_doctor?: boolean;
	is_active: boolean;
	created_at: string;
	updated_at: string;
};

