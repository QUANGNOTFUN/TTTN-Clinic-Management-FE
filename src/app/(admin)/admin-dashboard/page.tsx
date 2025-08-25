"use client";

import TableDropdownActions, {DropdownItem} from "@/app/(admin)/_components/organisms/adminManagerTable/TableDropdownActions";
import * as Icons from "lucide-react";
import {CircleEllipsis} from "lucide-react";


export default function ManagementPage() {
    const items: DropdownItem[] = [
        {
            icon: Icons.Settings,
            label: "Settings",
            onClick: () => console.log("Settings clicked"),
        },
        {
            icon: Icons.ChevronDown,
            label: "ChevronDown",
            onClick: () => console.log("ChevronDown clicked"),
        },
    ];

    return (
        <div className="p-4">
            <div className="flex justify-end mb-4">
                <TableDropdownActions icon={CircleEllipsis} items={items} />
            </div>
            <h1 className="text-2xl font-bold">Management Dashboard</h1>
            {/* Nội dung trang */}
        </div>
    );
}