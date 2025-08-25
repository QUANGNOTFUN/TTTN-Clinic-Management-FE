import {CreateRegimenInput} from "@/types/regimen";
import {CreateTreatmentPlanInput} from "@/types/treatment_plan";

export interface CreateExaminationReportInput{
    name: string;
    doctor_id: string;
    risk_assessment: string;
    is_HIV:boolean;
    HIV_test_file: string;
    regimen_id: number;
    treatment_plan_id?:string;
}

export interface MedicalExaminationInput{
    treatmentPlan?:CreateTreatmentPlanInput;
    regimen:CreateRegimenInput;
    report: CreateExaminationReportInput;
}
