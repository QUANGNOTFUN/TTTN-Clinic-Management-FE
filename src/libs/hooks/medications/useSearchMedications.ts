import {useQuery} from "@apollo/client";
import {Medication} from "@/types/medications";
import {SEARCH_MEDICATIONS} from "@/libs/graphqls/medications";

export function useSearchMedications(keyword: string) {
	const {data, loading, error, refetch} = useQuery<{ searchMedications: Medication[] }>(SEARCH_MEDICATIONS, {
		variables: { input: { keyword: keyword || "" } },
		skip: !keyword,
	});

	return {
		medications: data?.searchMedications || [],
		loading,
		error,
		refetch,
	};
}