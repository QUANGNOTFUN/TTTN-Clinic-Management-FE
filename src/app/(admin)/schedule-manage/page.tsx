'use client'
import AdminScheduleLayout from "@/app/(admin)/_components/organisms/adminSchedulesTable/AdminScheduleLayout";
import {useGetDoctors} from "@/libs/hooks/doctors/useGetDoctors";
import {CreateDoctorScheduleData, DoctorSchedule, WeekDateInput} from "@/types/doctorSchedule";
import {useCallback, useState} from "react";
import AdminForm from "@/app/(admin)/_components/organisms/create&UpdateForm/AdminForm";
import {CREATE_DOCTOR_SCHEDULE_INPUT} from "@/app/(admin)/schedule-manage/constant";
import {useCreateDoctorSchedule} from "@/libs/hooks/doctorSchedules/useCreateDoctorSchedule";
import {toast} from "react-toastify";
import {useGetDoctorSchedulesByWeekDate} from "@/libs/hooks/doctorSchedules/useGetDoctorSchedulesByWeekDate";
import {getWeekDates} from "@/libs/function/getWeekDates";
import {useDeleteDoctorSchedule} from "@/libs/hooks/doctorSchedules/useDeleteDoctorSchedule";

export default function AdminSchedulePage() {
	// INIT for data
	const { doctors } = useGetDoctors()
	const [selectedDate, setSelectedDate] = useState<Date>(new Date())
	const [weekDateInput, setWeekDateInput] = useState<WeekDateInput>(
		{
			start_week: getWeekDates()[0].toISOString(),
			end_week: getWeekDates()[6].toISOString(),
		}
	)
	const { data: schedules, loading: getLoading, error, refetch } = useGetDoctorSchedulesByWeekDate(weekDateInput)
	const { create: createSchedule, loading: createLoading } = useCreateDoctorSchedule()
	const { delete: deleteSchedule, loading: deleteLoading } = useDeleteDoctorSchedule()
	
	// INIT for components
	const [createScheduleData, setCreateScheduleData] = useState<CreateDoctorScheduleData | null>(null);
	const [isCreating, setIsCreating] = useState(false);
	const createInput = CREATE_DOCTOR_SCHEDULE_INPUT(doctors)
	
	const handSelectedDate = (date: Date) => {
		setSelectedDate(date)
		const weekDates = getWeekDates(date)
		setWeekDateInput({
			start_week: weekDates[0].toISOString(),
			end_week: weekDates[6].toISOString(),
		})
	}
	
	const handleCreateSubmit = useCallback(async (data: CreateDoctorScheduleData) => {
		try {
			await createSchedule(data)
			await refetch()
			toast.success("Tạo lịch thành công", {toastId: "create-schedule-success"} )
		} catch (error: unknown) {
			toast.error(`Tạo lịch thất bại: ${error instanceof Error ? error.message : String(error)}`, {toastId: "create-schedule-error"})
		} finally {
			setIsCreating(false)
			setCreateScheduleData(null)
		}
	}, [createSchedule, refetch])
	
	const handleDeleteSubmit = useCallback(async (id: DoctorSchedule['id']) => {
		try {
			await deleteSchedule(id)
			await refetch()
			toast.success("Xóa lịch thành công", {toastId: "delete-schedule-success"})
		} catch (error: unknown) {
			toast.error(`Xóa lịch thất bại: ${error instanceof Error ? error.message : String(error)}`, {toastId: "delete-schedule-error"})
		}
	}, [deleteSchedule, refetch])
	
	if (createLoading) return <div>Loading create...</div>;
	if (getLoading) return <div>Loading fetch ...</div>;
	if (deleteLoading) return <div>Loading delete ...</div>;
	if (error) return <div>Error: {error.message}</div>;
	
	return (
		<>
			{isCreating && (
				<AdminForm
					fields={createInput.fields}
					submitLabel={ createInput.submitLabel }
					title={createInput.title + " - " + new Date(createScheduleData.date).toLocaleDateString() }
					onSubmit={(input) => handleCreateSubmit({...createScheduleData, ...input})}
					onClose={() => {
						setIsCreating(false)
						setCreateScheduleData(null)
					}}
				/>
			)}
			{createScheduleData?.week_count}
			<AdminScheduleLayout
				doctors={doctors}
				schedules={schedules}
				dateProps={{
					date: selectedDate,
					onSelected: handSelectedDate,
				}}
				onCreateButton={(isOpen , createData) => {
					setIsCreating(isOpen);
					setCreateScheduleData(createData);
				}}
				onDeleteButton={handleDeleteSubmit}
			/>
		</>
	);
}