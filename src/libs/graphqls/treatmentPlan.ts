import {gql} from "@apollo/client";

export const GET_PATIENT_PLAN = gql`
    query GetPatientPlan($patient_id: String!) {
        findPatientPlan(patient_id: $patient_id) {
            patient_id
            plan_id
            plan {
                id
                name
                start_date
                end_date
                hiv_diagnosis_date
                notes
            }
        }
    }
`;
