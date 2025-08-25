import {Minimize2Icon, UserRoundCogIcon, UserRoundMinusIcon} from "lucide-react";
import {DoctorSchedule} from "@/types/doctorSchedule";

type ViewDoctorListCardProps = {
	label: string;
	schedules: DoctorSchedule[];
	editSchedule?: {
		status?: "view" | "delete";
		onDelete?: (id: DoctorSchedule["id"]) => void;
	};
	onClose: () => void;
};

export function ViewDoctorListCard(props: ViewDoctorListCardProps) {
	const { label, schedules, editSchedule, onClose } = props;
	
	const handleDelete = (id: DoctorSchedule["id"]) => {
		if (editSchedule?.onDelete) {
			editSchedule.onDelete(id);
		}
	};
	
	const rowCount = Math.ceil(schedules.length / 8);
	
	const deleteButton = (id: DoctorSchedule['id']) => {
		return (
			<div className="absolute top-1/6 right-2 h-full">
				<button
					onClick={editSchedule?.status === "delete" ? () => handleDelete(id) : () => {}}
					className={
						" p-1.5 outline outline-black/20 rounded-sm shadow-lg cursor-pointer " +
						"text-xs sm:text-sm md:text-base " +
						`bg-white hover:bg-violet-200 text-gray-700 hover:text-violet-500 ` +
						`dark:bg-gray-800 dark:hover:bg-gray-600 dark:text-gray-500 dark:hover:text-white
						}`
					}
				>
					<UserRoundMinusIcon className="w-3 h-3 md:w-4 md:h-4" />
				</button>
			</div>
		);
	};
	
	return (
		<div
			className="fixed top-0 left-0 w-full h-screen bg-zinc-900/60 flex items-center justify-center z-50"
		>
			<div className="relative p-6 rounded-sm max-w-[90%] min-h-[30%] overflow-y-auto bg-white dark:bg-gray-800">
				<h3 className="text-lg font-bold text-center text-gray-900 dark:text-gray-100 mb-2">{label}</h3>
				<button
					onClick={onClose}
					className={
						"absolute top-1 right-1 p-1 rounded-sm shadow-sm cursor-pointer text-gray-800 dark:text-white hover:text-white dark:hover:text-red-300" +
						" bg-zinc-100 dark:bg-gray-800 hover:bg-violet-200 dark:hover:bg-gray-600"
					}
				>
					<Minimize2Icon size={12} />
				</button>
				<div className={`grid grid-cols-${rowCount} gap-4 py-4 px-2`}>
					{schedules.map((schedule, index) => (
						<div
							key={schedule.doctor_id + index}
							className={
								"relative p-2 rounded-md shadow-md border border-gray-400 " +
								"hover:bg-zinc-200 dark:hover:bg-gray-600 bg-zinc-50 dark:bg-gray-700 " +
								"text-sm md:text-base wrap-break-word text-center text-black dark:text-white"
							}
						>
							{schedule.doctor.user.full_name}
							{deleteButton(schedule.id)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}