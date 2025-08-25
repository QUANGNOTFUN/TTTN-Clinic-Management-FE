export default function TongQuan(id: string) {

    return (
        <div className="flex-col flex-1">
            <div className="flex items-center justify-center text-lg">
                <div className="flex items-center text-lg">
                    Tên
                    Tuổi
                    Giới tính
                    Địa chỉ
                    Phone
                </div>
                <div className="flex items-center justify-center text-lg">
                    Lịch sử khám
                    Ngày khám, chuẩn đoán,bác sĩ khám
                </div>
            </div>
            <div className="flex items-center justify-center text-lg">
                Thông tin đang điều trị
                    CHuẩn đoán
                    CHế độ ăn
                    Phát đồ
                    THuốc đang xủ dụng
                    Sức khỏe hiện tại
            </div>
        </div>
    )
}