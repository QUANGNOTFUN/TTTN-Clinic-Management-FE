'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { VscLoading } from 'react-icons/vsc'
import { FiSearch, FiStar } from 'react-icons/fi'

interface Doctor {
  id: string
  full_name: string
  avatar_url: string
  rating: number
  services: {
    name: string
  }[]
}

const DoctorCard: React.FC<{ doctor: Doctor }> = ({ doctor }) => {
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

// Để dữ liệu mẫu tạm thời test thôi xong thì xóa đi nha 
const mockDoctors: Doctor[] = [
  {
    id: '1',
    full_name: 'Bác sĩ Nguyễn Văn An',
    avatar_url: 'https://i.pravatar.cc/150?img=1',
    rating: 4.8,
    services: [
      { name: 'Khám tổng quát' },
      { name: 'Nha khoa' }
    ]
  },
  {
    id: '2',
    full_name: 'Bác sĩ Trần Thị Bình',
    avatar_url: 'https://i.pravatar.cc/150?img=2',
    rating: 4.9,
    services: [
      { name: 'Tai mũi họng' },
      { name: 'Da liễu' }
    ]
  },
  {
    id: '3',
    full_name: 'Bác sĩ Lê Minh Cường',
    avatar_url: 'https://i.pravatar.cc/150?img=3',
    rating: 4.7,
    services: [
      { name: 'Nội soi' },
      { name: 'Khám tổng quát' }
    ]
  },
  {
    id: '4',
    full_name: 'Bác sĩ Phạm Thị Dung',
    avatar_url: 'https://i.pravatar.cc/150?img=4',
    rating: 4.6,
    services: [
      { name: 'Nha khoa' },
      { name: 'Tai mũi họng' }
    ]
  },
  {
    id: '5',
    full_name: 'Bác sĩ Hoàng Văn Em',
    avatar_url: 'https://i.pravatar.cc/150?img=5',
    rating: 4.9,
    services: [
      { name: 'Da liễu' },
      { name: 'Nội soi' }
    ]
  },
  {
    id: '6',
    full_name: 'Bác sĩ Vũ Thị Phương',
    avatar_url: 'https://i.pravatar.cc/150?img=6',
    rating: 4.8,
    services: [
      { name: 'Khám tổng quát' },
      { name: 'Da liễu' }
    ]
  },
  {
    id: '7',
    full_name: 'Bác sĩ Đặng Minh Giang',
    avatar_url: 'https://i.pravatar.cc/150?img=7',
    rating: 4.7,
    services: [
      { name: 'Nha khoa' },
      { name: 'Nội soi' }
    ]
  },
  {
    id: '8',
    full_name: 'Bác sĩ Bùi Thị Hoa',
    avatar_url: 'https://i.pravatar.cc/150?img=8',
    rating: 4.9,
    services: [
      { name: 'Tai mũi họng' },
      { name: 'Khám tổng quát' }
    ]
  },
  {
    id: '9',
    full_name: 'Bác sĩ Ngô Văn Ích',
    avatar_url: 'https://i.pravatar.cc/150?img=9',
    rating: 4.6,
    services: [
      { name: 'Da liễu' },
      { name: 'Nha khoa' }
    ]
  },
  {
    id: '10',
    full_name: 'Bác sĩ Đinh Thị Kim',
    avatar_url: 'https://i.pravatar.cc/150?img=10',
    rating: 4.8,
    services: [
      { name: 'Nội soi' },
      { name: 'Tai mũi họng' }
    ]
  }
]

export default function DoctorPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true)
        
        try {
          const response = await fetch('http://localhost:3000/doctors')
          if (response.ok) {
            const data = await response.json()
            setDoctors(data)
            return
          }
        } catch (apiError) {
          console.log('API không khả dụng, sử dụng dữ liệu mẫu')
        }
        
        setTimeout(() => {
          setDoctors(mockDoctors)
          setLoading(false)
        }, 500)
        
      } catch (err) {
        console.error('Error:', err)
        setError('Không thể tải danh sách bác sĩ. Vui lòng thử lại sau.')
        setLoading(false)
      }
    }

    fetchDoctors()
  }, [])

  const filteredDoctors = doctors.filter(doctor =>
    doctor.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-200 to-gray-50">
        <div className="text-center">
          <VscLoading className="animate-spin text-blue-600 text-6xl mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Đang tải danh sách bác sĩ...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-200 to-gray-50">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg max-w-md">
            <p className="font-semibold">Lỗi!</p>
            <p>{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 to-gray-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 text-center mb-8">
            Danh Sách Bác Sĩ
          </h1>
          
          <div className="max-w-md mx-auto relative">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Tìm kiếm bác sĩ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {searchTerm && (
          <div className="mb-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Tìm thấy {filteredDoctors.length} bác sĩ cho "{searchTerm}"
            </p>
          </div>
        )}

        {filteredDoctors.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {searchTerm ? 'Không tìm thấy bác sĩ nào phù hợp' : 'Chưa có bác sĩ nào'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
