import { AppointmentRequest } from "@/types/appointment-request";
import { ClinicService } from "@/types/clinic-service";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
	RequestsOfServiceCard
} from "@/app/(admin)/admin-dashboard/_component/AppointmentReqSection/RequestsOfServiceCard";

type SectionRecentAppointmentRequestProps = {
	services: ClinicService[];
	appointmentRequest: AppointmentRequest[];
};

export function AppointmentRequestSection(props: SectionRecentAppointmentRequestProps) {
	const { services, appointmentRequest } = props;
	
	
	return (
		<div className="bg-white rounded-xl shadow-sm p-6">
			<h2 className="text-xl font-semibold text-gray-800 mb-4">
				Yêu cầu đặt hẹn gần đây theo dịch vụ
			</h2>
			<ScrollArea className="w-full whitespace-nowrap">
				{ services?.length === 0
					? <p className="text-sm text-gray-500 italic">Không có dịch vụ nào.</p>
					: <div className="flex gap-4">
						{services?.map((service) => {
							const requests = appointmentRequest?.filter(
								(req) => req.service_id === service.id
							);
							return (
								<div key={service.id} className="w-[350px] shrink-0">
									<RequestsOfServiceCard
										nameService={service.name}
										quantity={requests.length}
										appointmentRequests={requests}
									/>
								</div>
							);
						})}
					</div>
				}
				<ScrollBar orientation="horizontal" />
			</ScrollArea>
		</div>
	);
}
