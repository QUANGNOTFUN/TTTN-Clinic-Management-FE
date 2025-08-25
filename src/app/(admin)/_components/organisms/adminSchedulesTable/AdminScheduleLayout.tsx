'use client'
import AdminSchedulesTable from "@/app/(admin)/_components/organisms/adminSchedulesTable/AdminSchedulesTable";
import DoctorScheduleFilter from "@/app/(admin)/_components/organisms/adminSchedulesTable/DoctorScheduleFilter";
import {ScheduleDatePicker} from "@/app/(admin)/_components/organisms/adminSchedulesTable/ScheduleDatePicker";
import {DoctorDisplay} from "@/types/doctors";
import {useState} from "react";
import {CreateDoctorScheduleData, DoctorSchedule} from "@/types/doctorSchedule";

export type AdminScheduleLayoutProps = {
	doctors: DoctorDisplay[];
	schedules?: DoctorSchedule[];
	dateProps?: { date: Date, onSelected: (date: Date) => void };
	onCreateButton: ( isOpen: boolean, createData: CreateDoctorScheduleData) => void;
	onDeleteButton: (id: DoctorSchedule['id']) => void;
}

export default function AdminScheduleLayout(
	props : AdminScheduleLayoutProps
) {
	const { doctors, schedules, dateProps, onCreateButton, onDeleteButton } = props;
	const [selectedDoctors, setSelectedDoctors] = useState<DoctorDisplay>()
	
	return (
		<div className={"flex flex-col"}>
			<div className={"w-full mb-4 flex justify-between items-center"}>
				<DoctorScheduleFilter
					doctors={doctors}
					onSelected={(doctor) => setSelectedDoctors(doctor)}
				/>
				
				<ScheduleDatePicker
					currentDate={dateProps.date}
					onSelected={(date) => {
						dateProps.onSelected(date);
				}} />
			</div>
			
			<AdminSchedulesTable
				selectedDate={dateProps.date}
				onCreateButton={onCreateButton}
				initialItems={schedules}
				editSchedule={{
					onDeleteButton: onDeleteButton
				}}
			/>
		</div>
	)
}