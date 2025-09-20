import { Badge } from "@/components/ui/badge"
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationPrevious,
	PaginationNext,
} from "@/components/ui/pagination"

export type AppointmentRequestFilterBadgeProps = {
	status?: "ALL" | "PENDING" | "CONFIRMED" | "CANCELLED"
	sort?: "asc" | "desc"
	page?: number
	totalPages?: number
	onStatusChange?: (status: AppointmentRequestFilterBadgeProps["status"]) => void
	onSortChange?: (order: AppointmentRequestFilterBadgeProps["sort"]) => void
	onPageChange?: (page: number) => void
}

export function AppointmentRequestFilterBadge(
	props: AppointmentRequestFilterBadgeProps
) {
	const {
		status = "ALL",
		sort = "desc",
		page = 1,
		totalPages = 1,
		onStatusChange,
		onSortChange,
		onPageChange,
	} = props
	
	const STATUSES: ("ALL" | "PENDING" | "CONFIRMED" | "CANCELLED")[] = [
		"ALL",
		"PENDING",
		"CONFIRMED",
		"CANCELLED",
	]
	
	return (
		<div className="flex justify-between w-full gap-4">
			{/* Filter + Sort */}
			<div className="flex gap-4 items-center flex-wrap">
				{/* Filter theo trạng thái */}
				<div className="flex gap-2 flex-wrap">
					{STATUSES.map((s) => (
						<Badge
							key={s}
							variant={status === s ? "default" : "outline"}
							className="cursor-pointer select-none"
							onClick={() => onStatusChange?.(s)}
						>
							{s}
						</Badge>
					))}
				</div>
				
				{/* Divider */}
				<div className="w-px h-6 bg-gray-300" />
				
				{/* Sort */}
				<div className="flex gap-2">
					<Badge
						variant={sort === "desc" ? "default" : "outline"}
						className="cursor-pointer select-none"
						onClick={() => onSortChange?.("desc")}
					>
						Mới nhất
					</Badge>
					<Badge
						variant={sort === "asc" ? "default" : "outline"}
						className="cursor-pointer select-none"
						onClick={() => onSortChange?.("asc")}
					>
						Cũ nhất
					</Badge>
				</div>
			</div>
			
			{/* Pagination */}
			<div className="flex gap-2">
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious
								onClick={() => onPageChange?.(page - 1)}
								className="cursor-pointer select-none"
							/>
						</PaginationItem>
						
						{Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
							<PaginationItem key={p}>
								<PaginationLink
									isActive={p === page}
									onClick={() => onPageChange?.(p)}
									className="cursor-pointer select-none"
								>
									{p}
								</PaginationLink>
							</PaginationItem>
						))}
						
						<PaginationItem>
							<PaginationNext
								onClick={() => onPageChange?.(page + 1)}
								className="cursor-pointer select-none"
							/>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</div>
		</div>
	)
}
