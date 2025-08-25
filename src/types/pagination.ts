export interface PaginatedResponse<T> {
  items: T[];
  total: number;
	page: number;
	pageSize: number;
	totalPages: number;
}

export interface PaginationInput {
	page: number;
	limit: number;
}