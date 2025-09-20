'use client'

import React from 'react';
import Image from 'next/image';
import {Doctor} from '@/types/doctor';
import {GET_IMAGE_API} from "@/lib/api/image";
import {ArrowRight, MapPin, Star, Stethoscope} from "lucide-react";

const NO_SPECIALTY = 'Chưa cập nhật';

export type DoctorCardProps = {
	doctor: Doctor;
};

export function DoctorCard({ doctor }: DoctorCardProps) {
	const specialtyName = doctor.specialty ?? NO_SPECIALTY;
	
	return (
		<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-out">
			<div
				key={doctor.user_id}
				className="snap-start flex-shrink-0 w-64 sm:w-auto group bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
			>
				<div className="relative h-[40vh] w-full">
					<Image
						src={
							doctor.avatar_url
								? GET_IMAGE_API(doctor.avatar_url)
								: "https://placehold.co/600x400"
						}
						alt={doctor.full_name}
						fill
						className="object-cover"
					/>
					<div className="absolute top-3 right-3 bg-white/80 dark:bg-gray-700 px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1">
						<Star className="text-yellow-500 w-3.5 h-3.5" />
						{doctor.rating}
					</div>
				</div>
				<div className="p-4">
					<h3 className="text-base font-bold text-gray-800 dark:text-gray-100 group-hover:text-teal-600 truncate">
						{doctor.full_name}
					</h3>
					<p className="flex items-center gap-2 text-teal-600 dark:text-teal-400 mt-2 text-sm truncate">
						<Stethoscope className="w-4 h-4" /> {specialtyName}
					</p>
					<p className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mt-1 text-xs truncate">
						<MapPin className="w-4 h-4" /> {doctor.phone_number}
					</p>
					<button className="mt-4 w-full inline-flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-lg font-semibold shadow-sm hover:opacity-90 transition text-sm">
						Xem chi tiết
						<ArrowRight className="w-4 h-4" />
					</button>
				</div>
			</div>
		</div>
	);
}