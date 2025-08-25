"use client";

import { useState } from "react";
import { MoreVertical } from "lucide-react"; // icon gốc để mở menu
import * as LucideIcons from "lucide-react";

interface Setting {
    title: string;
    icon: string;
    action: () => void;
}

interface Props {
    settings: Setting[];
}

export default function ActionIconMenu({ settings }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={() => setOpen(!open)}
                className="p-2 rounded-full hover:bg-gray-100 transition"
            >
                <MoreVertical className="w-5 h-5 text-gray-700" />
            </button>

            {open && (
                <div className="absolute right-0 z-10 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                    {settings.map((setting, index) => {
                        const Icon = (LucideIcons as any)[setting.icon] || MoreVertical;

                        return (
                            <button
                                key={index}
                                onClick={() => {
                                    setting.action();
                                    setOpen(false);
                                }}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                <Icon className="w-4 h-4 mr-2" />
                                {setting.title}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
