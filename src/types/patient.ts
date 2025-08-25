import {TreatmentPlan} from "@/types/treatment_plan";
import {User} from "@/types/user";

export interface Patient {
    patient_id: string;
    plan_id?: number | null;
    plan?: TreatmentPlan | null;
    user: User;
}