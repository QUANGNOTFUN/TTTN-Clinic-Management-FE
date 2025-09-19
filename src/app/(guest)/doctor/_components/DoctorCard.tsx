'use client'

import React from 'react'
import Image from 'next/image'
import { FiStar } from 'react-icons/fi'

export interface Doctor {
  id: string
  full_name: string
  avatar_url: string
  rating: number
  services: { name: string }[]
}

export const DoctorCard: React.FC<{ doctor: Doctor }> = ({ doctor }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-out">
      <div className="flex justify-center mb-4">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-blue-100">
          <Image
            src={doctor.avatar_url || '/default-avatar.png'}
            alt={doctor.full_name}
            fill
            className="object-cover"
            sizes="96px"
          />
        </div>
      </div>

      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 text-center mb-3">
        {doctor.full_name}
      </h3>

      <div className="flex items-center justify-center mb-4">
        <FiStar className="text-yellow-400 w-5 h-5 mr-1" />
        <span className="text-gray-700 dark:text-gray-300 font-semibold">
          {doctor.rating.toFixed(1)}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {doctor.services.map((service, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
          >
            {service.name}
          </span>
        ))}
      </div>
    </div>
  )
}

export default DoctorCard


