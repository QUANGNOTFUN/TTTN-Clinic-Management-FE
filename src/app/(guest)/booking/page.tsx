"use client";

import {motion} from "framer-motion";
import {ClinicServicesCard} from "@/app/(guest)/booking/_components/molecules/ClinicServicesCard";
import {useFindAllClinicServices} from "@/libs/hooks/clinic-services/useFindAllClinicServices";
import {useState} from "react";

export default function BookingPage() {
    const { data, loading } = useFindAllClinicServices();
    const [isSelected, setSelected] = useState<string | null>('asda');
    
    if (loading) return <p>Đang tải...</p>;
    
    return (
        <div className={'flex min-h-screen pt-14 p-6'}>
            {/*{Main Selected}*/}
            <div className={"flex-3 flex flex-col items-center justify-center h-150"}>
                {isSelected && (
                    <ClinicServicesCard className={'w-7/10 h-9/10'} item={data[0]} />
                )}
            </div>
            <div className={"flex-7 flex flex-col"}>
                {/*{ Property Of Selected Service }*/}
                <div className={"flex-8 flex flex-col items-center justify-center h-150"}>
                    <ClinicServicesCard className={'w-9/10 h-8/10'} item={data[0]} />
                </div>
                {/*{ List Clinic Services }*/}
                <div className={"flex-2 justify-center bottom-10 right-10 flex gap-4"}>
                    {data.map((service, i) => (
                        <motion.div
                            key={service.id}
                            layoutId={service.id} // để framer biết "cùng 1 card"
                            initial={{ opacity: 0, x: 50, y: 50 }}
                            animate={{ opacity: 1, x: 0, y: 0 }}
                            transition={{ delay: i * 0.2, type: "spring", stiffness: 100 }}
                            onClick={() => setSelected(service.id)}
                        >
                            <ClinicServicesCard className={'w-9/10 h-9/10'} item={service} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
