import React from 'react';

interface DoctorCardProps {
    avatar?: string;
    fullName: string;
    qualifications?: string;
    specialty?: string;
    hospital?: string;
    workSeniority?: number;
    rating?: number;
    gender?: string;
    email?: string;
    phone?: string;
    defaultFee?: number;
}

const DoctorCard: React.FC<DoctorCardProps> = ({
   avatar,
   fullName,
   qualifications,
   specialty,
   hospital,
   workSeniority,
   rating,
   gender,
   email,
   phone,
   defaultFee
  }) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-8">
            {/* Thông tin cơ bản */}
            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-40 h-40 md:w-48 md:h-48 overflow-hidden rounded-xl border shadow">
                    <img
                        src={ avatar || '/default-doctor.jpg'}
                        alt={fullName}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                            {qualifications ? qualifications + ' ' : ''}{fullName}
                        </h1>
                        <p className="text-blue-600 font-semibold">
                            {specialty || 'Chuyên khoa chưa rõ'}
                        </p>
                        <p className="text-gray-700">{hospital || 'Bệnh viện chưa rõ'}</p>
                        <p className="text-gray-600">
                            {workSeniority
                                ? `Gần ${workSeniority} năm kinh nghiệm`
                                : 'Chưa có thông tin kinh nghiệm'}
                        </p>
                        <p className="text-gray-600">
                            Giới tính: {gender || 'Không xác định'}
                        </p>
                    </div>

                    {/* Phí khám và đánh giá */}
                    <div className="mt-4 flex flex-wrap items-center gap-4">
                        <div className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-semibold text-sm">
                            Phí khám: {defaultFee ? `${defaultFee.toLocaleString()} VNĐ` : 'Chưa rõ'}
                        </div>
                        <div className="text-yellow-500 font-medium">
                            Đánh giá: ⭐ {rating ? rating.toFixed(1) : 'N/A'}
                        </div>
                    </div>
                </div>
            </div>

            <hr />

            {/* Thông tin liên hệ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                <div>
                    <h2 className="text-lg font-semibold mb-1">Thông tin liên hệ</h2>
                    <p>Email: {email || 'Chưa có thông tin'}</p>
                    <p>Điện thoại: {phone || 'Chưa có thông tin'}</p>
                </div>
                <div>
                    <h2 className="text-lg font-semibold mb-1">Địa chỉ</h2>
                    <p>{hospital || 'Bệnh viện Nhiệt Đới - Khoa HIV/AIDS'}</p>
                    <p>Tô Ký, Q.12, TP.HCM</p>
                </div>
            </div>

            <hr />

            {/* Dịch vụ & quy trình */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700">
                <div>
                    <h2 className="text-lg font-semibold mb-2">Quy trình thăm khám</h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Tư vấn ban đầu về nguy cơ phơi nhiễm</li>
                        <li>Xét nghiệm HIV, HCV, HBV, STDs</li>
                        <li>Đánh giá miễn dịch và tải lượng virus</li>
                        <li>Điều trị bằng thuốc ARV</li>
                        <li>Hỗ trợ tâm lý, theo dõi lâu dài</li>
                    </ul>
                </div>
                <div>
                    <h2 className="text-lg font-semibold mb-2 ">Dịch vụ cung cấp</h2>
                    <ul className="list-disc list-inside space-y-1 ">
                        <li>Điều trị HIV/AIDS</li>
                        <li>PrEP (dự phòng trước phơi nhiễm)</li>
                        <li>PEP (dự phòng sau phơi nhiễm)</li>
                        <li>Khám bệnh lây qua đường tình dục</li>
                        <li>Điều trị đồng nhiễm lao, viêm gan</li>
                    </ul>
                </div>
            </div>

            <hr />

            {/* Đánh giá mô phỏng */}
            <div className="text-gray-700 space-y-1">
                <h2 className="text-lg font-semibold">Đánh giá từ người bệnh</h2>
                <p>Thái độ phục vụ: ⭐⭐⭐⭐⭐</p>
                <p>Thời gian chờ đợi: ⭐⭐⭐⭐⭐</p>
                <p>Bảo mật & hỗ trợ tâm lý: ⭐⭐⭐⭐⭐</p>
                <p>Được giới thiệu: 92% (1,240 lượt đánh giá)</p>
            </div>
        </div>
    );
};

export default DoctorCard;
