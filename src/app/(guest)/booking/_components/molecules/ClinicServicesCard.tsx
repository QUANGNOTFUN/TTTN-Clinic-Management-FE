import Image from "next/image";
import { ClinicServiceResponse } from "@/types/clinic-service";

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
		        rounded-lg md:rounded-xl
		        bg-gradient-to-tr from-gray-200 via-slate-400/50 to-gray-100
		        hover:from-slate-500 hover:to-slate-600
		        shadow-sm hover:shadow-2xl
		        transform hover:scale-105 hover:-translate-y-1
		        transition-all duration-300 ease-out
		        flex flex-col items-center justify-center
		        p-1 md:p-5
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
						className={`object-cover ${isSelected && "rounded-xl"} hidden sm:block`}
						sizes={isSelected ? "60vw" : "80px"}
						priority={isSelected}
					/>
				
				</div>
			)}
			
			{/* Name Clinic Service */}
			<p
				className={`
				  
		          text-center italic tracking-wide
		          ${isSelected
					  ? "mb-4 md:mb-0 font-bold text-lg sm:text-xl md:text-2xl tracking-wider"
					  : "font-medium text-sm sm:text-base md:text-lg"
				  }
		          text-gray-800 group-hover:text-indigo-200 transition-colors
		        `}
			>
				{item?.name || "Không có tên dịch vụ"}
			</p>
		</div>
	);
}
