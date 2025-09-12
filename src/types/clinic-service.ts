export type ClinicServiceResponse = {
	id: string;
	name: string;
	description?: string;
	price?: string;
	duration_minutes?: number;
	image_url?: string;
	requires_doctor?: boolean;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
};
