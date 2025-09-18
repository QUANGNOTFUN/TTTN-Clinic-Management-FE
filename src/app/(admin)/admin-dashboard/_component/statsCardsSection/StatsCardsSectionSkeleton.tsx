import { Skeleton } from "@/components/ui/skeleton";

export function StatsCardsSectionSkeleton() {
	return (
		<div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
			{[...Array(4)].map((_, i) => (
				<div
					key={i}
					className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl shadow-lg p-6 flex flex-col items-center"
				>
					<Skeleton className="h-8 w-8 mb-2 rounded-full" />
					<Skeleton className="h-4 w-24 mb-2" />
					<Skeleton className="h-6 w-12" />
				</div>
			))}
		</div>
	);
}
