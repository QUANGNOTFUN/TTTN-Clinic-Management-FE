import Link from "next/link";
import { Phone, Mail, HeartPulse, Shield, Info } from "lucide-react";

export default function Footer() {
  return (
      <footer className="relative rounded-t-3xl overflow-hidden bg-gradient-to-r from-teal-50 via-sky-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-t border-gray-200 dark:border-gray-700">
        {/* Overlay pattern subtle */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 dark:opacity-10" />
        
        <div className="relative max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-14">
          {/* Cột giới thiệu */}
          <div>
            <h2 className="text-4xl font-extrabold tracking-wide bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent mb-6">
              Y Tế Thông Minh
            </h2>
            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-400">
              Nền tảng quản lý sức khỏe toàn diện, hỗ trợ đặt lịch khám và theo dõi
              hồ sơ bệnh án một cách{" "}
              <span className="font-semibold text-teal-600 dark:text-teal-400">an toàn</span>,{" "}
              <span className="font-semibold text-blue-600 dark:text-blue-400">tiện lợi</span> và{" "}
              <span className="font-semibold text-pink-600 dark:text-pink-400">hiện đại</span>.
            </p>
          </div>
          
          {/* Cột liên kết */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100 tracking-wide">
              Liên kết
            </h3>
            <ul className="space-y-4 text-base">
              <li>
                <Link
                    href="#"
                    className="flex items-center gap-2 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-teal-500 hover:to-blue-600 transition-all duration-300"
                >
                  <Info size={18} /> Giới thiệu
                </Link>
              </li>
              <li>
                <Link
                    href="#"
                    className="flex items-center gap-2 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-teal-500 hover:to-blue-600 transition-all duration-300"
                >
                  <Shield size={18} /> Điều khoản
                </Link>
              </li>
              <li>
                <Link
                    href="#"
                    className="flex items-center gap-2 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-teal-500 hover:to-blue-600 transition-all duration-300"
                >
                  <HeartPulse size={18} /> Chính sách bảo mật
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Cột liên hệ */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100 tracking-wide">
              Liên hệ
            </h3>
            <p className="text-base flex items-center gap-3">
              <Phone className="text-teal-600 dark:text-teal-400" size={20} />{" "}
              1900 123 456
            </p>
            <p className="text-base flex items-center gap-3 mt-4">
              <Mail className="text-pink-500 dark:text-pink-400" size={20} />{" "}
              contact@yte.vn
            </p>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="relative text-center text-sm md:text-base py-8 bg-gradient-to-r from-slate-200 to-slate-100 dark:from-gray-800 dark:to-gray-900 text-gray-600 dark:text-gray-400 border-t border-gray-300 dark:border-gray-700">
          © 2025 <span className="font-semibold text-gray-900 dark:text-gray-200">Y Tế Thông Minh</span>. All rights reserved.
        </div>
      </footer>
  );
}
