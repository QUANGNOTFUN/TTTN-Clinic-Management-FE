'use client'

import React, { useMemo, useState } from 'react';
import { VscLoading } from 'react-icons/vsc';
import { FiSearch } from 'react-icons/fi';
import { useFindAllDoctors } from '@/lib/hooks/doctors/useFindAllDoctors';
import { DoctorCard } from '@/app/(guest)/doctor/_components/DoctorCard';
import { Doctor } from '@/types/doctor';

const ALL_OPTION = 'Tất cả';
const NO_SPECIALTY = 'Chưa cập nhật';

export default function DoctorPage() {
  const { data: doctors = [], isLoading: doctorLoading } = useFindAllDoctors();
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState<string>(ALL_OPTION);
  
  // Lấy danh sách chuyên khoa từ specialty của bác sĩ
  const allSpecialties = useMemo(() => {
    const s = new Set<string>();
    s.add(ALL_OPTION);
    s.add(NO_SPECIALTY);
    
    doctors.forEach((doctor) => {
      if (doctor.specialty) {
        s.add(doctor.specialty);
      }
    });
    
    return Array.from(s).sort();
  }, [doctors]);
  
  // Lọc bác sĩ dựa trên tên và chuyên khoa
  const filteredDoctors = useMemo<Doctor[]>(() => {
    return doctors.filter((doctor) => {
      const matchName = doctor.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? true;
      let matchSpecialty: boolean;
      
      if (specialtyFilter === ALL_OPTION) {
        matchSpecialty = true;
      } else if (specialtyFilter === NO_SPECIALTY) {
        matchSpecialty = !doctor.specialty;
      } else {
        matchSpecialty = doctor.specialty === specialtyFilter;
      }
      
      return matchName && matchSpecialty;
    });
  }, [doctors, searchTerm, specialtyFilter]);
  
  if (doctorLoading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <div className="text-center">
            <VscLoading className="animate-spin text-blue-500 text-5xl mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">Đang tải danh sách bác sĩ...</p>
          </div>
        </div>
    );
  }
  
  return (
      <div className="min-h-screen pt-4 bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Search and Filter */}
          <div className="w-full max-w-3xl mx-auto mb-12">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="md:col-span-3 relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Tìm kiếm bác sĩ theo tên..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-md bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 shadow-sm hover:shadow-md text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>
              <div className="md:col-span-2">
                <select
                    value={specialtyFilter}
                    onChange={(e) => setSpecialtyFilter(e.target.value)}
                    className="w-full px-4 py-3 rounded-md bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 shadow-sm hover:shadow-md text-gray-800 dark:text-gray-200"
                >
                  {allSpecialties.map((specialty) => (
                      <option key={specialty} value={specialty} className="bg-white dark:bg-gray-700">
                        {specialty}
                      </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Result Count */}
          {(searchTerm || specialtyFilter !== ALL_OPTION) && (
              <div className="mb-2 text-center">
                <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                  Tìm thấy <span className="text-blue-600 dark:text-blue-400 font-bold">{filteredDoctors.length}</span> bác sĩ
                </p>
              </div>
          )}
          
          {/* Doctor List */}
          {filteredDoctors.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 dark:text-gray-400 text-xl font-medium">
                  Không tìm thấy bác sĩ nào phù hợp
                </p>
                <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                  Vui lòng thử tìm kiếm với tiêu chí khác
                </p>
              </div>
          ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredDoctors.map((doctor) => (
                    <DoctorCard key={doctor.user_id} doctor={doctor} />
                ))}
              </div>
          )}
        </div>
      </div>
  );
}