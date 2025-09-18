import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CalendarClock, Phone, User } from "lucide-react";
import { AppointmentRequest } from "@/types/appointment-request";

type RequestsOfServiceCardProps = {
	nameService: string;
	quantity: number;
	appointmentRequests: AppointmentRequest[];
};

export function RequestsOfServiceCard(props: RequestsOfServiceCardProps) {
	const { nameService, quantity, appointmentRequests } = props;
	
	return (
		<Card className="w-full rounded-2xl shadow-md border border-gray-200">
			<CardHeader className="flex flex-row items-center justify-between pb-3">
				<CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
					<CalendarClock className="h-5 w-5 text-blue-500" />
					{nameService}
				</CardTitle>
				<Badge variant="secondary" className="text-sm px-3 py-1">
					{quantity} yêu cầu
				</Badge>
			</CardHeader>
			<CardContent className="pt-0">
				{appointmentRequests.length === 0 ? (
					<p className="text-sm text-gray-500 italic">
						Không có yêu cầu nào cho dịch vụ này.
					</p>
				) : (
					<ScrollArea className="h-[250px] pr-2">
						<ul className="space-y-3">
							{appointmentRequests.map((req) => (
								<li
									key={req.id}
									className="flex items-start gap-3 rounded-lg border border-gray-100 p-3 hover:bg-gray-50 transition"
								>
									<Avatar className="h-9 w-9">
										<AvatarFallback>
											{req.full_name.charAt(0).toUpperCase()}
										</AvatarFallback>
									</Avatar>
									<div className="flex-1 space-y-1">
										<p className="text-sm font-medium text-gray-900 flex items-center gap-2">
											<User className="h-4 w-4 text-gray-400" />
											{req.full_name}
										</p>
										<p className="text-sm text-gray-600 flex items-center gap-2">
											<Phone className="h-4 w-4 text-gray-400" />
											{req.phone_number}
										</p>
										<p className="text-xs text-gray-500">
											Đặt lúc:{" "}
											{new Date(req.created_at).toLocaleString("vi-VN", {
												dateStyle: "short",
												timeStyle: "short",
											})}
										</p>
									</div>
									<Badge
										variant={
											req.status === "CONFIRMED"
												? "default"
												: req.status === "PENDING"
													? "secondary"
													: "destructive"
										}
									>
										{req.status}
									</Badge>
								</li>
							))}
						</ul>
					</ScrollArea>
				)}
			</CardContent>
		</Card>
	);
}