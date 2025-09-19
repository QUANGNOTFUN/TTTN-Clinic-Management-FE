"use client";

import {motion} from "framer-motion";
import {ClinicServicesCard} from "@/app/(guest)/booking/_components/molecules/ClinicServicesCard";
import {useFindAllClinicServices} from "@/lib/hooks/clinic-services/useFindAllClinicServices";
import React, {useEffect, useState} from "react";
import {Navigation, Pagination} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {VscLoading} from "react-icons/vsc";
import {AppointmentFormCard} from "./_components/molecules/AppointmentFormCard";
import {useFindOnePatient} from "@/lib/hooks/patients/useFindOnePatient";

export default function BookingPage() {
    const { data, isPending } = useFindAllClinicServices();
    const [isSelected, setSelected] = useState<string | null>(null);
    const { data: patient } = useFindOnePatient()
    
    useEffect(() => {
        if (data && data.length > 0 && !isSelected) {
            setSelected(data[0].id);
        }
    }, [data, isSelected]);
    
    if (isPending) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-300 bg-opacity-50">
                <VscLoading className="animate-spin text-black text-[50px]" />
            </div>
        );
    }
    if (!data || data.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-300 bg-opacity-50">
                <p className="text-black text-[50px]">Không có dịch vụ nào</p>
            </div>
        );
    }
    
    return (
        <div
            className="flex flex-col md:flex-row min-h-screen pt-16 md:pt-20 p-4 gap-3
                bg-gradient-to-br from-slate-500 to-gray-200"
        >
            {/* Left - Main Selected */}
            <div className="w-full md:w-2/5 lg:w-1/3 flex flex-col items-center justify-center">
                {isSelected && (
                    <ClinicServicesCard
                        className="w-[80%] h-[6vh] md:h-[80vh] max-h-[800px]"
                        url_image={"https://sdmntpraustraliaeast.oaiusercontent.com/files/00000000-39f4-61fa-a38d-f1f082280c0d/raw?se=2025-09-03T22%3A16%3A15Z&sp=r&sv=2024-08-04&sr=b&scid=b5071798-c451-5704-8159-8598392bb00e&skoid=cb94e22a-e3df-4e6a-9e17-1696f40fa435&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-09-03T19%3A16%3A31Z&ske=2025-09-04T19%3A16%3A31Z&sks=b&skv=2024-08-04&sig=7Niu/%2Bl4b0YDL11R/SkSX7%2B/QZWlZfZNzfJFpNlI/7I%3D"}
                        item={data.find((s) => s.id === isSelected) || data[0]}
                        isSelected={true}
                    />
                )}
            </div>
            
            {/* Right - Properties + List */}
            <div className={"w-full md:w-3/5 lg:w-2/3 flex flex-col gap-2"}>
                {/* Properties */}
                <div className={"flex items-center justify-center"}>
                    <AppointmentFormCard
                        className="flex[8] w-[90%] md:h-[70vh] max-h-[600px]"
                        service={data.find((s) => s.id === isSelected) || data[0]}
                        userId={patient?.user_id}
                    />
                </div>
                
                {/* List Clinic Services */}
                <div className="flex flex-row justify-center items-center flex-[3] relative">
                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={20}
                        slidesPerView={2}
                        navigation={{
                            nextEl: ".custom-next",
                            prevEl: ".custom-prev",
                        }}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            1024: { slidesPerView: 4 },
                        }}
                        className="w-full max-w-4xl px-12"
                    >
                        {data
                            .filter((service) => service.id !== isSelected) // ẩn cái đang chọn
                            .map((service) => (
                                <SwiperSlide key={service.id}>
                                    <motion.div
                                        layoutId={service.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ type: "spring", stiffness: 100 }}
                                        onClick={() => setSelected(service.id)}
                                    >
                                        <ClinicServicesCard className="w-full h-15 md:h-25 cursor-pointer" item={service} />
                                    </motion.div>
                                </SwiperSlide>
                            ))}
                    </Swiper>
                    
                    {/* Custom Navigation Buttons */}
                    <button className="custom-prev absolute left-0 z-10 bg-white shadow-md rounded-full p-3 hover:bg-gray-100 cursor-pointer">
                        ◀
                    </button>
                    <button className="custom-next absolute right-0 z-10 bg-white shadow-md rounded-full p-3 hover:bg-gray-100 cursor-pointer">
                        ▶
                    </button>
                </div>
            </div>
        </div>
    );
}
