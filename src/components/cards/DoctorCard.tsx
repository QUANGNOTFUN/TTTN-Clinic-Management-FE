import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {Doctor} from "@/types/doctors";

interface DoctorCardProps {
  doctor?: Doctor; // Cho phép doctor là undefined
}

const DoctorCard: FC<DoctorCardProps> = ({ doctor }) => {
  if (!doctor) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-600">
        Không có thông tin bác sĩ
      </div>
    );
  }

  const displayName = doctor.qualifications || 'Bác sĩ';
  const displaySpecialty = doctor.specialty || 'Chưa xác định';
  const description = doctor.hospital
    ? `Công tác tại ${doctor.hospital}${doctor.work_seniority ? `, ${doctor.work_seniority} năm kinh nghiệm` : ''}`
    : 'Chưa có thông tin bệnh viện';

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center transform hover:scale-105 transition-transform">
      <div className="md:w-1/3">
        <Image
          src="/images/doctor-placeholder.jpg"
          alt={displayName}
          width={150}
          height={150}
          className="w-full h-40 object-cover rounded-lg"
          priority={false}
        />
      </div>
      <div className="md:w-2/3 md:pl-6 mt-4 md:mt-0 text-center md:text-left">
        <h3 className="text-xl font-semibold text-gray-800">{displayName}</h3>
        <p className="text-blue-600 font-medium mb-2">{displaySpecialty}</p>
        <p className="text-gray-600">{description}</p>
        <Link href={`/booking?doctorId=${doctor.id}`} className="inline-block mt-4 text-blue-600 hover:underline">
          Đặt lịch với bác sĩ
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;
