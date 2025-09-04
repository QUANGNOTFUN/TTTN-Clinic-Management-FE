import Image from "next/image";
import { ClinicServiceResponse } from "@/models/clinic-service";

export type ClinicServicesCardType = {
	className: string;
	url_image?: string;
	item: ClinicServiceResponse;
	isSelected?: boolean;
};

export function ClinicServicesCard(props: ClinicServicesCardType) {
	const { className, url_image, item, isSelected } = props;
	
	return (
		<div
			className={`
		        ${className}
		        rounded-2xl
		        bg-gradient-to-br from-slate-700 via-zinc-500 to-gray-800
		        hover:from-slate-500 hover:to-slate-600
		        shadow-md hover:shadow-2xl
		        transform hover:scale-105 hover:-translate-y-1
		        transition-all duration-300 ease-out
		        flex flex-col items-center justify-center
		        p-5
		    `}
		>
			{/* Image Card */}
			{url_image && (
				<div
					className={`
			            relative mb-4
			            ${isSelected ? "w-full h-[50%]" : "w-20 h-20"}
			        `}
				>
					<Image
						src={url_image}
						alt={item?.name || "Logo dịch vụ"}
						fill
						className={`object-cover ${isSelected ? "rounded-xl" : "rounded-full"} hidden sm:block`}
						sizes={isSelected ? "60vw" : "80px"}
						priority={isSelected}
					/>
				
				</div>
			)}
			
			{/* Name Clinic Service */}
			<p
				className={`
		          text-center italic tracking-wide
		          ${isSelected ? "font-semibold text-lg sm:text-xl md:text-2xl" : "font-medium text-sm sm:text-base md:text-lg"}
		          text-gray-100 group-hover:text-indigo-200 transition-colors
		        `}
			>
				{item?.name || "Không có tên dịch vụ"}
			</p>
		</div>
	);
}
