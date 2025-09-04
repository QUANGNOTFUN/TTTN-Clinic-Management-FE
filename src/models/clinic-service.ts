export type ClinicServiceResponse = {
	id: string;
	name: string;
	description: string;
	price: string;
	duration: number;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
	requiresDoctorSelection?: boolean;
};
