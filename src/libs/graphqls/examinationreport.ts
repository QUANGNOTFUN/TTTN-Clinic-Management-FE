import { gql } from "@apollo/client";

export const CREATE_EXAMINATION = gql`
    mutation makeMedicalExamination($input: MedicalExaminationInput!) {
        makeMedicalExamination(input: $input)
    }
`;
