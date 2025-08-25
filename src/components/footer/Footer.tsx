// app/components/Footer.tsx
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-200 text-gray-700">
            <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h2 className="text-xl font-semibold text-blue-700 mb-3">Y Tế Thông Minh</h2>
                    <p className="text-sm">
                        Nền tảng quản lý sức khỏe, hỗ trợ đặt lịch khám và theo dõi bệnh án dễ dàng.
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2">Liên kết</h3>
                    <ul className="space-y-1 text-sm">
                        <li><Link href="/about" className="hover:text-blue-600">Giới thiệu</Link></li>
                        <li><Link href="/terms" className="hover:text-blue-600">Điều khoản</Link></li>
                        <li><Link href="/privacy" className="hover:text-blue-600">Chính sách bảo mật</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2">Liên hệ</h3>
                    <p className="text-sm">📞 1900 123 456</p>
                    <p className="text-sm">✉️ contact@yte.vn</p>
                </div>
            </div>
            <div className="text-center text-sm py-4 border-t border-gray-200">
                © 2025 Y Tế Thông Minh. All rights reserved.
            </div>
        </footer>
    );
}
