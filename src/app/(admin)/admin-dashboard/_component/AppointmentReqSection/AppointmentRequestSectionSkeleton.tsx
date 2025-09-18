import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export function AppointmentRequestSectionSkeleton() {
	return (
		<div className="bg-white rounded-xl shadow-sm p-6">
			{/* Title */}
			<Skeleton className="h-6 w-72 mb-4" />
			
			{/* Scrollable cards */}
			<ScrollArea className="w-full whitespace-nowrap">
				<div className="flex gap-4">
					{[...Array(4)].map((_, i) => (
						<div
							key={i}
							className="w-[350px] shrink-0 rounded-2xl border border-gray-200 p-4"
						>
							{/* Card header */}
							<div className="flex justify-between items-center mb-3">
								<Skeleton className="h-5 w-32" />
								<Skeleton className="h-5 w-16" />
							</div>
							
							{/* Card content list */}
							<div className="space-y-3">
								{[...Array(3)].map((_, j) => (
									<div
										key={j}
										className="flex items-start gap-3 rounded-lg border border-gray-100 p-3"
									>
										<Skeleton className="h-9 w-9 rounded-full" />
										<div className="flex-1 space-y-2">
											<Skeleton className="h-4 w-28" />
											<Skeleton className="h-4 w-24" />
											<Skeleton className="h-3 w-20" />
										</div>
										<Skeleton className="h-5 w-16 rounded" />
									</div>
								))}
							</div>
						</div>
					))}
				</div>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>
		</div>
	);
}
