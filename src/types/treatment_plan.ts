
export interface TreatmentPlan{
    id:number;
    name:string;
    hiv_diagnosis_date?: Date;
    start_date: Date;
    end_date?: Date;
    notes?: string;
    created_at: Date;
    updated_at?: Date;
}

    export interface CreateTreatmentPlanInput {
        name: string;
        hiv_diagnosis_date?: Date;
        start_date?: Date;
        end_date?: Date;
        notes?: string;
    }