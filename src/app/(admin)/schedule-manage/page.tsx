'use client'

import {AdminScheduleTable} from "@/app/(admin)/_components/organisms/adminSchedulesTable/AdminSchedulesTable";
import {useState} from "react";
import {useFindAllDoctors} from "@/lib/hooks/doctors/useFindAllDoctors";
import {useFindAllScheduleByDate} from "@/lib/hooks/doctor-shedules/useFindAllScheduleByDate";
import {useCreateDoctorSchedule} from "@/lib/hooks/doctor-shedules/useCreateDoctorSchedule";
import {CreateDoctorScheduleDto} from "@/types/doctor-schedule";

export default function ScheduleManagePage() {
	const [selectedDate, setSelectedDate] = useState(new Date())
	const { data: doctors, isLoading: doctorLoading,  } = useFindAllDoctors();
	const { data: schedules, error } = useFindAllScheduleByDate(selectedDate)
	const { mutateAsync: create, isPending: createLoading } = useCreateDoctorSchedule();
	
	const handleAddSchedule = async (payload: CreateDoctorScheduleDto) => {
		await create(payload)
	}
	
	const handleRemoveSchedule = (scheduleId: string) => {
		// Implement remove schedule logic
		console.log('Removing schedule:', scheduleId)
	}
	
	if (doctorLoading || createLoading) return (<div className={"flex min-h-screen items-center justify-center"}>Loading Doctor...</div>)
	if (error) return (<div className={"flex min-h-screen items-center justify-center"}>Error Loading Doctor...</div>)
	if (!doctors) return (<div className={"flex min-h-screen items-center justify-center"}>No Doctor Found...</div>)
	if (!schedules) return (<div className={"flex min-h-screen items-center justify-center"}>
		<h1>{ selectedDate.toISOString() }</h1></div>)
	
	return (
		<div className={""}>
			<AdminScheduleTable
				doctors={doctors}
				schedules={schedules}
				selectedDate={selectedDate}
				onDateChange={setSelectedDate}
				onAddSchedule={handleAddSchedule}
				onRemoveSchedule={handleRemoveSchedule}
			/>
		</div>
	)
	
}