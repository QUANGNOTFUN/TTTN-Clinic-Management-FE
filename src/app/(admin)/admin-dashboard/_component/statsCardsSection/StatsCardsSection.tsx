import {ClinicService} from "@/types/clinic-service";
import {Doctor} from "@/types/doctor";
import {Patient} from "@/types/patient";
import {Calendar, Stethoscope, Users, Users2Icon} from "lucide-react";
import {AppointmentRequest} from "@/types/appointment-request";

type SectionStatsCardsProps = {
	doctors: Doctor[];
	patients: Patient[];
	services: ClinicService[];
	appointmentRequest: AppointmentRequest[];
}

export function StatsCardsSection(props: SectionStatsCardsProps) {
	const {doctors, patients, services, appointmentRequest} = props;
	
	return(
		<div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
			<div className="bg-gradient-to-br from-teal-100 to-teal-200 rounded-xl shadow-lg p-6 flex flex-col items-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
				<Users className="h-8 w-8 text-teal-600 mb-2" />
				<span className="text-sm text-gray-600">Tổng Số Bác Sĩ</span>
				<span className="text-2xl font-semibold text-teal-700">
                    {doctors?.length ?? 0}
                </span>
			</div>
			<div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl shadow-lg p-6 flex flex-col items-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
				<Users2Icon className="h-8 w-8 text-blue-600 mb-2" />
				
				<span className="text-sm text-gray-600">Tổng Số Bệnh Nhân</span>
				<span className="text-2xl font-semibold text-blue-700">
                    {patients?.length ?? 0}
                </span>
			</div>
			<div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl shadow-lg p-6 flex flex-col items-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
				<Stethoscope className="h-8 w-8 text-purple-600 mb-2" />
				<span className="text-sm text-gray-600">Tổng Số Dịch Vụ</span>
				<span className="text-2xl font-semibold text-purple-700">
                    {services?.length ?? 0}
                </span>
			</div>
			<div className="bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl shadow-lg p-6 flex flex-col items-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
				<Calendar className="h-8 w-8 text-emerald-600 mb-2" />
				<span className="text-sm text-gray-600">Cuộc Hẹn Hôm Nay</span>
				<span className="text-2xl font-semibold text-emerald-700">
                    {appointmentRequest?.length ?? 0}
                </span>
			</div>
		</div>
	);
}