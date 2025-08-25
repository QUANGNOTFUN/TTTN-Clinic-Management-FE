'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Doctor } from '@/types/doctors';

interface Props {
    doctor: Doctor;
}

function DoctorCard({ doctor }: Props) {
    if (!doctor || !doctor.user) return null;

    const user = doctor.user;
    const avatarSrc = user.avatar?.startsWith('http') ? user.avatar : '/doctor-placeholder.jpg';

    return (
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
            <div className="relative w-20 h-20 rounded-full overflow-hidden">
                <Image
                    src={avatarSrc}
                    alt={user.full_name || 'Bác sĩ'}
                    fill
                    className="object-cover"
                />
            </div>
            <div>
                <h2 className="text-lg font-bold text-gray-800">{user.full_name || 'Bác sĩ'}</h2>
                <p className="text-blue-600">{doctor.specialty || 'Chưa xác định'}</p>
                <p className="text-gray-600">{doctor.hospital || 'Chưa có thông tin bệnh viện'}</p>

                <Link href={`/booking/${user.id}`} className="text-sm text-blue-600 hover:underline mt-2 block">
                    Đặt lịch với bác sĩ
                </Link>
            </div>
        </div>
    );
}

export default DoctorCard;
