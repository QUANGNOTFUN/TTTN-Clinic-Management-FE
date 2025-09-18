import React from 'react';
import '../globals.css';
import type {Metadata} from "next";
import {ToastContainer} from "react-toastify";
import ProtectedLayout from "@/app/(admin)/protectedLayout";
import AdminHeader from "@/app/(admin)/_components/organisms/header/AdminHeader";

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
      <ProtectedLayout>
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
      </ProtectedLayout>
  );
}