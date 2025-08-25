export default function HelpPage() {
    return (
        <div className=" flex flex-col p-6 bg-gray-100 text-gray-600 overflow-y-auto">
            <div className="bg-white p-4 rounded-lg shadow mb-6">
                <h2 className="text-xl font-semibold mb-4">Câu hỏi thường gặp</h2>
                <ul className="space-y-3">
                    <li>
                        <strong>❓ Làm sao để tạo phiếu khám mới?</strong>
                        <p className="text-sm text-gray-600">Vào trang "Phiếu khám" {">"} Nhấn nút "Tạo mới" > Điền thông tin cần thiết.</p>
                    </li>
                    <li>
                        <strong>❓ Tôi không thấy danh sách bệnh nhân?</strong>
                        <p className="text-sm text-gray-600">Kiểm tra lại kết nối hoặc đảm bảo bạn đã chọn ngày phù hợp trong bộ lọc.</p>
                    </li>
                    <li>
                        <strong>❓ Làm sao để cập nhật thông tin cá nhân?</strong>
                        <p className="text-sm text-gray-600">Vào phần "Tài khoản" > "Chỉnh sửa thông tin".</p>
                    </li>
                </ul>
            </div>
            <div className="bg-white p-4 rounded-lg shadow mb-6">
                <h2 className="text-xl font-semibold mb-4">Liên hệ hỗ trợ</h2>
                <p className="text-sm text-gray-700 mb-2">Nếu bạn cần thêm hỗ trợ, vui lòng liên hệ với đội kỹ thuật:</p>
                <ul className="text-sm text-gray-600 list-disc list-inside">
                    <li>Email: huyhehe@clinic.vn</li>
                    <li>Hotline: 1900 999 888 (8:00 - 20:00)</li>
                    <li>Zalo hỗ trợ kỹ thuật: 0987 123 456</li>
                </ul>
            </div>
        </div>
    );
}
