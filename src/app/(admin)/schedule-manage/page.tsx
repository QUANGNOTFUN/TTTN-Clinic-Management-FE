"use client";

import {AdminScheduleTable} from "@/app/(admin)/schedule-manage/_components/adminSchedulesTable/AdminSchedulesTable";
import React, {useState} from "react";
import {useFindAllDoctors} from "@/lib/hooks/doctors/useFindAllDoctors";
import {useFindAllScheduleByWeek} from "@/lib/hooks/doctor-shedules/useFindAllScheduleByWeek";
import {useCreateDoctorSchedule} from "@/lib/hooks/doctor-shedules/useCreateDoctorSchedule";
import {VscLoading} from "react-icons/vsc";
import {
	CreateDoctorScheduleDto,
	CreateScheduleForm,
} from "@/app/(admin)/schedule-manage/_components/createScheduleForm/CreateScheduleForm";
import {useFindOneScheduleByWeek} from "@/lib/hooks/doctor-shedules/useFindOneScheduleByWeek";
import {useDeleteDoctorSchedule} from "@/lib/hooks/doctor-shedules/useDeleteDoctorSchedule";
import {DeleteDialogGeneric} from "@/app/(admin)/schedule-manage/_components/deleteScheduleDialog/DeleteDialogGeneric";
import {DoctorSchedule} from "@/types/doctor-schedule";

export default function ScheduleManagePage() {
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [selectedDoctor, setSelectedDoctor] = useState<string>("");
	const [selectedSchedule, setSelectedSchedule] = useState<string>("");
	const {
		data: doctors = [],
		isLoading: doctorLoading,
		isFetching: doctorFetching,
	} = useFindAllDoctors();
	const {
		data: schedulesFindAll = [],
		isLoading: scheduleFindAllLoading,
		isFetching: scheduleFindAllFetching,
		refetch: refreshFindAll,
	} = useFindAllScheduleByWeek(selectedDate);
	const {
		data: schedulesFindOne = [],
		isLoading: scheduleFindOneLoading,
		isFetching: scheduleFindOneFetching,
		refetch: refreshFindOne,
	} = useFindOneScheduleByWeek(selectedDoctor, selectedDate);
	const { mutateAsync: create, isPending: createPending } = useCreateDoctorSchedule();
	const { mutateAsync: deleteSchedule, isPending: deletePending } = useDeleteDoctorSchedule();
	
	// Init creates a schedule form
	const [isCreating, setIsCreating] = useState<boolean>(false);
	const [selectedDataCreate, setSelectedDataCreate] = useState<CreateDoctorScheduleDto>();
	// Init deletes a schedule
	const [isDeleting, setIsDeleting] = useState<boolean>(false);
	const scheduleDelete = schedulesFindAll.find((schedule) => schedule.id === selectedSchedule);
	
	const handleAddSchedule = async (payload: CreateDoctorScheduleDto) => {
		try {
			await create(payload);
			setIsCreating(false);
			setSelectedDoctor("");
			setSelectedDataCreate(undefined);
		} catch (error) {
			console.error("Error creating schedule:", error);
		}
	};
	
	const handleRemoveSchedule = async () => {
		await deleteSchedule(selectedSchedule);
		await refreshFindAll();
		await refreshFindOne();
		setIsDeleting(false);
	};
	
	// Kiểm tra tất cả trạng thái loading/pending
	const isAnyLoading =
		doctorLoading || doctorFetching ||
		scheduleFindAllLoading || scheduleFindAllFetching ||
		scheduleFindOneLoading || scheduleFindOneFetching ||
		createPending || deletePending;
	
	if (isAnyLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-zinc-300 bg-opacity-50">
				<VscLoading className="animate-spin text-black text-[50px]" />
			</div>
		);
	}
	
	return (
		<>
			{isCreating && !createPending && (
				<CreateScheduleForm
					doctors={doctors}
					defaultDate={selectedDataCreate.date}
					defaultShift={selectedDataCreate.shift}
					onCreateSchedule={handleAddSchedule}
					onClose={() => {
						setIsCreating(false);
						setSelectedDataCreate(undefined);
					}}
				/>
			)}
			
			{isDeleting && (
				<DeleteDialogGeneric<DoctorSchedule>
					item={scheduleDelete}
					onAction={handleRemoveSchedule}
					onClose={() => setIsDeleting(false)}
					title="Xóa lịch làm việc"
					description="Bạn có chắc chắn muốn xóa lịch làm việc này?"
				/>
			)}
			
			<AdminScheduleTable
				doctors={doctors}
				schedules={ selectedDoctor ? schedulesFindOne : schedulesFindAll }
				selectedDate={selectedDate}
				onSelectedDoctor={setSelectedDoctor}
				onDateChange={setSelectedDate}
				onAddSchedule={(payload) => {
					setIsCreating(true);
					setSelectedDataCreate(payload);
				}}
				onRemoveSchedule={(scheduleId) => {
					setIsDeleting(true);
					setSelectedSchedule(scheduleId);
				}}
			/>
		</>
	);
}