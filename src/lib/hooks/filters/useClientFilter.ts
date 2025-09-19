import { useMemo } from "react"

export type Pagination = {
	page: number
	pageSize: number
}

export type ClientFilterOptions<T, M> = {
	data: T[]
	filterField?: keyof T
	allValue?: string
	filtersType?: M
	sortField?: keyof T
	sortOrder?: "asc" | "desc" // default: "desc"
	pagination?: Pagination
}

export function useClientFilter<T, M>(props: ClientFilterOptions<T, M>) {
	const {
		data,
		filterField,
		filtersType,
		allValue,
		sortField,
		sortOrder = "desc",
		pagination = { page: 1, pageSize: 10 },
	} = props;
	
	const { page, pageSize } = pagination;
	
	// 1. Filter
	const filteredData = useMemo(() => {
		if (!filterField || filtersType === undefined || filtersType === null || filtersType === allValue) {
			return data;
		}
		
		return data.filter((item) => {
			const itemValue = item[filterField as keyof T];
			if (typeof itemValue === "string" && typeof filtersType === "string") {
				return itemValue.toLowerCase().includes(filtersType.toLowerCase());
			}
			return itemValue === filtersType;
		});
	}, [data, filterField, filtersType, allValue]);
	
	// 2. Sort
	const sortedData = useMemo(() => {
		if (!sortField) return filteredData;
		
		return [...filteredData].sort((a, b) => {
			const aVal = a[sortField as keyof T];
			const bVal = b[sortField as keyof T];
			
			if (typeof aVal === "number" && typeof bVal === "number") {
				return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
			}
			
			return sortOrder === "asc"
				? String(aVal ?? "").localeCompare(String(bVal ?? ""))
				: String(bVal ?? "").localeCompare(String(aVal ?? ""));
		});
	}, [filteredData, sortField, sortOrder]);
	
	// 3. Pagination
	const paginatedData = useMemo(() => {
		const start = (page - 1) * pageSize;
		const end = start + pageSize;
		return sortedData.slice(start, end);
	}, [sortedData, page, pageSize]);
	
	const totalItems = filteredData.length;
	const totalPages = Math.ceil(totalItems / pageSize);
	
	return {
		data: paginatedData,
		totalItems,
		totalPages,
	};
}

