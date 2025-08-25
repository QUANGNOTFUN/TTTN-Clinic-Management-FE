"use client";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { ActionSetting } from "./Action";

export default function ActionMenu<T>({ data, actions, onAction }: ActionSetting<T>) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="p-2 rounded hover:bg-gray-100">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {actions.map((item) => (
                    !item.hide && (
                        <DropdownMenuItem
                            key={item.action}
                            onClick={() => onAction(item.action, data)}
                            className="flex items-center gap-2"
                            style={{ color: item.color || "inherit" }}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </DropdownMenuItem>
                    )
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}