import { Skeleton } from "@/components/ui/skeleton";

interface AdminManagerTableSkeletonProps {
	columns: number;
	rows?: number;
}

export function AdminManagerTableSkeleton({ columns, rows = 5 }: AdminManagerTableSkeletonProps) {
	return (
		<div className="overflow-x-auto rounded-md border border-gray-200">
			<table className="w-full table-auto border-collapse text-center">
				<thead className="bg-gray-100">
				<tr>
					{Array.from({ length: columns }).map((_, i) => (
						<th
							key={i}
							className="border-b border-gray-200 px-4 py-2 text-sm font-semibold"
						>
							<Skeleton className="h-4 w-20 mx-auto" />
						</th>
					))}
				</tr>
				</thead>
				<tbody>
				{Array.from({ length: rows }).map((_, rowIdx) => (
					<tr key={rowIdx}>
						{Array.from({ length: columns }).map((_, colIdx) => (
							<td
								key={colIdx}
								className="border-b border-gray-200 p-3 text-sm"
							>
								<Skeleton className="h-4 w-24 mx-auto" />
							</td>
						))}
					</tr>
				))}
				</tbody>
			</table>
		</div>
	);
}
