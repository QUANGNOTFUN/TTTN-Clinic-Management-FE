// app/components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-50 to-slate-100 text-gray-700 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Cột giới thiệu */}
        <div>
          <h2 className="text-2xl font-bold text-blue-700 mb-4">
            Y Tế Thông Minh
          </h2>
          <p className="text-sm leading-relaxed text-gray-600">
            Nền tảng quản lý sức khỏe, hỗ trợ đặt lịch khám và theo dõi bệnh án
            một cách tiện lợi và dễ dàng.
          </p>
        </div>

        {/* Cột liên kết */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Liên kết</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="#"
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Giới thiệu
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Điều khoản
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Chính sách bảo mật
              </Link>
            </li>
          </ul>
        </div>

        {/* Cột liên hệ */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Liên hệ</h3>
          <p className="text-sm flex items-center gap-2">
            <span className="text-blue-600">📞</span> 1900 123 456
          </p>
          <p className="text-sm flex items-center gap-2 mt-2">
            <span className="text-pink-500">✉️</span> contact@yte.vn
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm py-5 bg-slate-200 text-gray-600">
        © 2025 Y Tế Thông Minh. All rights reserved.
      </div>
    </footer>
  );
}
