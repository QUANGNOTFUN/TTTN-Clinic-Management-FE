import React from 'react';
import '../globals.css';
import type {Metadata} from "next";
import {ToastContainer} from "react-toastify";
import AdminHeader from "@/app/(admin)/_components/organisms/header/AdminHeader";
import ProtectedAdminLayout from "@/app/(admin)/protectedAdminLayout";

export const metadata: Metadata = {
  title: "Quản lí phòng khám",
  description: "Nền tảng quản lý sức khỏe, hỗ trợ đặt lịch khám và theo dõi bệnh án dễ dàng.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <ProtectedAdminLayout>
          <div className={"min-h-screen "}>
              <AdminHeader />
              <main className={"pt-16 bg-gray-100 min-h-screen"}>
                  {children}
              </main>
          </div>
          <ToastContainer
              position={"top-right"}
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={true}
              rtl={false}
              pauseOnFocusLoss={false}
              draggable
              pauseOnHover={false}
              theme={"light"}
          />
      </ProtectedAdminLayout>
  );
}