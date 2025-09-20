'use client'

import HeroBanner from "@/app/(guest)/(home)/_component/banner/HeroBanner";
import React from "react";
import {ServicesSectionHome} from "@/app/(guest)/(home)/_component/sectionsLayout/ServicesSectionHome";
import ContactSectionHome from "@/app/(guest)/(home)/_component/sectionsLayout/ContactSectionHome";
import FeaturedDoctorsSectionHome from "@/app/(guest)/(home)/_component/sectionsLayout/FeaturedDoctorsSectionHome";

export default function HomePage() {
    return (
        <div className="relative flex flex-col">
            <HeroBanner />
            
            <ServicesSectionHome />
            
            <FeaturedDoctorsSectionHome />
            
            <ContactSectionHome />
        </div>
    );
}