export interface Medication {
	id: number;
	acronym: string;
	name: string;
	price: number;
	available_quantity: number;
}

export interface CreateMedicationInput {
	acronym: string;
	name: string;
	price: number;
	available_quantity: number;
}

export interface DeleteMedicationInput {
	id: number;
}

export interface UpdateMedicationInput {
	acronym?: string | null;
	name?: string | null;
	price?: number | null;
	available_quantity?: number | null;
}
