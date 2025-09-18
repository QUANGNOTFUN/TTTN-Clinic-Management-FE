"use client";


export default function AdminDashBoardPage() {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <div className="flex-1 flex flex-col">
                
                {/* Dashboard Content */}
                <main className="p-6 space-y-6">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Card thống kê */}
                        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
                            <span className="text-sm text-gray-500">Tổng số bác sĩ</span>
                            <span className="text-2xl font-semibold text-emerald-600">120</span>
                        </div>
                        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
                            <span className="text-sm text-gray-500">Tổng số bệnh nhân</span>
                            <span className="text-2xl font-semibold text-emerald-600">540</span>
                        </div>
                        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
                            <span className="text-sm text-gray-500">Lịch hẹn hôm nay</span>
                            <span className="text-2xl font-semibold text-emerald-600">34</span>
                        </div>
                        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
                            <span className="text-sm text-gray-500">Doanh thu tháng</span>
                            <span className="text-2xl font-semibold text-emerald-600">75M</span>
                        </div>
                    </div>
                    
                    {/* Ví dụ bảng hoặc chart */}
                    <div className="bg-white rounded-xl shadow p-6">
                        <h2 className="text-lg font-semibold mb-4">Hoạt động gần đây</h2>
                        <ul className="space-y-3 text-gray-600">
                            <li>Bệnh nhân <b>Nguyễn Văn A</b> đã đặt lịch hẹn.</li>
                            <li>Bác sĩ <b>Trần Thị B</b> hoàn thành ca khám.</li>
                            <li>Bệnh nhân <b>Lê Văn C</b> hủy lịch hẹn.</li>
                        </ul>
                    </div>
                </main>
            </div>
        </div>
    );
}
