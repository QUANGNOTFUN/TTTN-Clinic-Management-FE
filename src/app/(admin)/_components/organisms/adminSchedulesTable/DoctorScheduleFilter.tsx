import {DoctorDisplay} from "@/types/doctors";
import {useState} from "react";
import {ChevronDownIcon, ChevronUpIcon, XIcon} from "lucide-react";

export type DoctorScheduleFilterProps = {
	doctors: DoctorDisplay[];
	onSelected: (doctor: DoctorDisplay) => void;
}

export default function DoctorScheduleFilter(
	{ doctors, onSelected }: DoctorScheduleFilterProps
) {
	const [isOpen, setIsOpen] = useState(false);
	const rowCount = Math.ceil(doctors?.length / 8);
	const [searchTerm, setSearchTerm] = useState("");
	
	const triggerButton = () => {
		return (
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={
					"flex items-center justify-center w-auto p-2 outline outline-black/20 rounded-lg shadow-lg cursor-pointer " +
					"text-xs sm:text-sm md:text-base " +
					`bg-gray-50 hover:bg-violet-200  text-gray-700 hover:text-violet-500 ${isOpen ? 'bg-violet-200 text-violet-500 ' : ' '}` +
					`dark:bg-gray-800 dark:hover:bg-gray-600 dark:text-gray-500 dark:hover:text-white ${isOpen ? "dark:bg-gray-600 dark:text-white " : " "}`
				}
			>
				<span>{"Xem lịch đặt khám của bác sĩ"}</span>
				{isOpen ? <ChevronUpIcon className="w-4 h-4 ml-2" /> : <ChevronDownIcon className="w-4 h-4 ml-2" />}
			</button>
		);
	};
	
	const searchButton = () => {
		return (
			<div className="w-full flex items-center justify-evenly border-b border-zinc-400 py-2">
				{/*{ Search Input }*/}
				<div className={"relative w-full flex items-center justify-center"}>
					<input
						type="text"
						placeholder="Tìm bác sĩ..."
						value={searchTerm}
						onChange={handleSearchChange}
						className="w-full p-2 border outline outline-black/20 rounded-md hover:ring-1 focus:outline-none focus:ring-2 focus:ring-violet-500"
					/>
					<button
						onClick={() => setSearchTerm("")}
						className={"absolute right-2 p-1 text-zinc-500 hover:text-zinc-900 cursor-pointer"}
					>
						<XIcon size={16} />
					</button>
				</div>
			</div>
		)
	}
	
	// Lọc danh sách dựa trên searchTerm
	const filteredItems = doctors?.filter((item) =>
		item.full_name.toLowerCase().includes(searchTerm.toLowerCase())
	);
	
	// Hàm xử lý thay đổi input search
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};
	
	const handleSelect = (doctor: DoctorDisplay) => {
		if (onSelected) onSelected(doctor);
		setIsOpen(false);
	}
	
	return (
		<div className="relative">
			{triggerButton()}
			{isOpen && (
				<div className={"absolute left-0 mt-2 p-3 max-h-110 sm:min-w-sm md:min-w-md lg:min-w-lg outline outline-black/20 shadow-lg rounded-md z-50 " +
					"text-xs sm:text-sm md:text-base " +
					"bg-gray-50 dark:bg-gray-700 dark:text-gray-200 "
				}>
					{ searchButton() }
					{/*{ Card Item }*/}
					<div className={`grid grid-cols-${rowCount} gap-4 py-4 px-2 max-h-90 overflow-y-auto`}>
						{filteredItems?.map((doctor, index) => (
							<button
								key={index}
								onClick={() => handleSelect(doctor)}
								className={"p-2 rounded-md shadow-md text-center truncate border border-zinc-400 cursor-pointer " +
									"bg-gray-50 hover:bg-violet-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"}
							>
								{doctor.full_name}
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
}