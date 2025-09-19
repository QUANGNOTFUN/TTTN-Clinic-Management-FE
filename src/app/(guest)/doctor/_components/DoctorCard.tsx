'use client'

import React from 'react';
import Image from 'next/image';
import { FiStar } from 'react-icons/fi';
import { Doctor } from '@/types/doctor';

const NO_SPECIALTY = 'Chưa cập nhật';

export type DoctorCardProps = {
	doctor: Doctor;
};

export function DoctorCard({ doctor }: DoctorCardProps) {
	const specialtyName = doctor.specialty ?? NO_SPECIALTY;
	
	return (
		<div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-out">
			<div className="flex justify-center mb-4">
				<div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-blue-100 dark:border-blue-900">
					<Image
						src={doctor.avatar_url || '/default-avatar.png'}
						alt={doctor.full_name || 'Bác sĩ'}
						fill
						className="object-cover"
						sizes="96px"
					/>
				</div>
			</div>
			
			<h3 className="text-lg font-bold text-gray-800 dark:text-white text-center mb-3 truncate">
				{doctor.full_name || 'Chưa cập nhật tên'}
			</h3>
			
			<div className="flex items-center justify-center mb-4">
				<FiStar className="text-yellow-400 w-5 h-5 mr-1" />
				<span className="text-gray-700 dark:text-gray-300 font-semibold">
          {doctor.rating ? doctor.rating.toFixed(1) : 'Chưa có đánh giá'}
        </span>
			</div>
			
			<div className="flex flex-wrap gap-2 justify-center">
        <span
	        className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium px-3 py-1 rounded-full"
        >
          {specialtyName}
        </span>
			</div>
		</div>
	);
}