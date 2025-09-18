import {Dialog, DialogDescription, DialogHeader, DialogTitle,} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Doctor} from "@/types/doctor";
import {X} from "lucide-react";

type DeleteDoctorDialogProps = {
	doctor: Doctor;
	onAction: (id: string) => void;
	onClose?: () => void;
};

export function DeleteDoctorDialog({ doctor, onAction, onClose }: DeleteDoctorDialogProps) {
	const handleDelete = () => {
		onAction(doctor.user_id);
		if (onClose) onClose();
	};
	
	const handleClose = () => {
		if (onClose) onClose();
	};
	
	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			{/* Overlay với background blur */}
			<div
				className="fixed inset-0 bg-black/50 backdrop-blur-md"
				onClick={handleClose}
			/>
			{/* Dialog container */}
			<div className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-[425px] z-50">
				<button
					onClick={handleClose}
					className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
				>
					<X className="h-6 w-6" />
				</button>
				<Dialog>
					<DialogHeader>
						<DialogTitle className="text-2xl font-bold text-gray-800">
							Xác Nhận Xóa Bác Sĩ
						</DialogTitle>
						<DialogDescription className="text-gray-600 mb-6">
							Bạn có chắc chắn muốn xóa bác sĩ: <strong className={"text-md"}>{doctor?.full_name}</strong> ? Hành động
							này không thể hoàn tác!
						</DialogDescription>
					</DialogHeader>
				</Dialog>
				<div className="flex justify-end gap-4">
					<Button
						variant="outline"
						onClick={handleClose}
						className="hover:bg-gray-100 transition-all duration-200"
					>
						Hủy
					</Button>
					<Button
						variant="destructive"
						onClick={handleDelete}
						className="hover:bg-red-600 transition-all duration-200"
					>
						Xác Nhận
					</Button>
				</div>
			</div>
		</div>
	);
}