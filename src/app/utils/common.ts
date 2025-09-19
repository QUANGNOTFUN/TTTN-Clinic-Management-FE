import { FieldError, Merge, FieldErrorsImpl } from 'react-hook-form';

export function getErrorMessage(
    error: FieldError | Merge<FieldError, FieldErrorsImpl<unknown>> | undefined
): string {
    if (error) {
        return error.message as string;
    }
    return '';
}