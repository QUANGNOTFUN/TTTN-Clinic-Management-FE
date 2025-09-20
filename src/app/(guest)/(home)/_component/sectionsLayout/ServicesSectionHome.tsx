import React from "react";
import { useFindAllClinicServices } from "@/lib/hooks/clinic-services/useFindAllClinicServices";
import { ServiceCardHome } from "@/app/(guest)/(home)/_component/cards/ServiceCardHome";
import { useRouter } from "next/navigation";

export function ServicesSectionHome() {
	const { data: services = [] } = useFindAllClinicServices();
	const router = useRouter();
	
	return (
		<section className="relative pt-16 min-h-screen overflow-hidden">
			{/* Gradient background */}
			<div className="absolute inset-0 bg-gradient-to-br from-teal-200 via-emerald-100 to-sky-100 dark:from-teal-900 dark:via-emerald-800 dark:to-sky-900" />
			
			{/* Decorative circles */}
			<div className="absolute top-0 left-0 w-72 h-72 bg-teal-300/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
			<div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-400/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
			
			{/* Content */}
			<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
				<h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
					Dịch Vụ Của Chúng Tôi
				</h2>
				
				<div className="flex gap-4 overflow-x-auto sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6 sm:overflow-visible p-2 snap-x snap-mandatory">
					{services.map((service, index) => (
						<div key={index} className="snap-start flex-shrink-0 w-72 sm:w-auto">
							<ServiceCardHome
								url_image={service.image_url}
								title={service.name}
								description={service.description}
								price={service.price}
								index={index}
								onClick={() => router.push("/booking")}
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
