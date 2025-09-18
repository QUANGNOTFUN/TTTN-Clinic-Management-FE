"use client";

import AdminSidebarDesktop from "./AdminSidebarDesktop";
import AdminSidebarMobile from "./AdminSidebarMobile";

export default function AdminSidebar() {
  return (
      <>
        {/* Mobile */}
        <AdminSidebarMobile />
        {/* Desktop */}
        <AdminSidebarDesktop />
      </>
  );
}
