import { useQuery } from "@apollo/client";
import { GET_MEDICATIONS } from "@/libs/graphqls/medications";
import { Medication } from "@/types/medications";
import {PaginatedResponse, PaginationInput} from "@/types/pagination";
import {useEffect, useState} from "react";

export function useGetMedications(page = 1, limit = 20) {
	const [paginationInput, setPaginationInput] = useState<PaginationInput>({
		page: page,
		limit: limit,
	});
	
	const { data, loading, error, refetch } = useQuery<{
		medications: PaginatedResponse<Medication>
	}>(GET_MEDICATIONS, {
		variables: { input: paginationInput },
		notifyOnNetworkStatusChange: true,
	})
	
	useEffect(() => {
		if (data?.medications) {
			setPaginationInput({
				page: data.medications.page,
				limit: data.medications.pageSize,
			})
		}
	}, [data])
	
	const goToPage = (page: number) => {
		setPaginationInput((prev) => ({
			...prev,
			page,
		}));
	};
	
	// Hàm để thay đổi limit (số item trên mỗi trang)
	const setPageSize = (limit: number) => {
		setPaginationInput((prev) => ({
			...prev,
			limit,
			page: 1, // Reset về trang 1 khi thay đổi limit
		}));
	};
	
	return {
		input: paginationInput,
		medications: data?.medications?.items || [],
		total: data?.medications?.total || 0,
		page: data?.medications?.page || 1,
		pageSize: data?.medications?.pageSize || 10,
		totalPage: data?.medications?.totalPages || 1,
		loading,
		error,
		refetch,
		goToPage,
		setPageSize,
	};
}