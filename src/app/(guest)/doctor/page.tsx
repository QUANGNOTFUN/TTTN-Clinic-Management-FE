'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { VscLoading } from 'react-icons/vsc'
import { FiSearch } from 'react-icons/fi'
import DoctorCard, { Doctor } from './_components/DoctorCard'

const ALL_OPTION = 'Tất cả dịch vụ'

export default function DoctorPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [serviceFilter, setServiceFilter] = useState<string>(ALL_OPTION)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true)
        const response = await fetch('http://localhost:3000/doctors')
        if (!response.ok) throw new Error('Failed to fetch doctors')
        const data = await response.json()
        setDoctors(data)
      } catch (err) {
        setError('Không thể tải danh sách bác sĩ. Vui lòng thử lại sau.')
      } finally {
        setLoading(false)
      }
    }
    fetchDoctors()
  }, [])

  const allServices = useMemo(() => {
    const s = new Set<string>()
    doctors.forEach(d => d.services?.forEach(sv => sv?.name && s.add(sv.name)))
    return [ALL_OPTION, ...Array.from(s).sort()]
  }, [doctors])

  const filteredDoctors = useMemo(() => {
    return doctors.filter(doctor => {
      const matchName = doctor.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchService =
        serviceFilter === ALL_OPTION || doctor.services?.some(sv => sv.name === serviceFilter)
      return matchName && matchService
    })
  }, [doctors, searchTerm, serviceFilter])

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
        <div className="mb-8 ">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 text-center mb-8">
            Danh Sách Bác Sĩ
          </h1>

          <div className="w-full max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Tìm kiếm bác sĩ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              />
            </div>
            <div>
              <select
                value={serviceFilter}
                onChange={e => setServiceFilter(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                {allServices.map(sv => (
                  <option key={sv} value={sv}>{sv}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {(searchTerm || serviceFilter !== ALL_OPTION) && (
          <div className="mb-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Tìm thấy {filteredDoctors.length} bác sĩ
            </p>
          </div>
        )}

        {filteredDoctors.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Không tìm thấy bác sĩ nào phù hợp
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


