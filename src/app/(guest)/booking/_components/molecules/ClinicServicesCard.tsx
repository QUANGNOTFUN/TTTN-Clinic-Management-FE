import {ClinicServiceResponse} from "@/models/clinic-service";

export type ClinicServicesCardType = {
	className: string;
	item: ClinicServiceResponse;
}

export function ClinicServicesCard(
	props : ClinicServicesCardType
) {
	const { className, item } = props
	return (
		<div className={`${className} shadow-md rounded-lg cursor-pointer bg-gradient-to-r from-slate-400 to-gray-50`}>
			<p className="text-center text-sm text-black">
				{ item?.name || "Không có tên dịch vụ"}
			</p>
		</div>
	);
}