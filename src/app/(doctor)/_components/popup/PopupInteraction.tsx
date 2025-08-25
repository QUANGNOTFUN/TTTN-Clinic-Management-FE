// app/(doctor)/_components/dialog/PopupInteraction.tsx

"use client";
import React from "react";

interface Field {
    name: string;
    label: string;
    type: "text" | "select";
    value: string;
    options?: string[];
    onChange: (value: string) => void;
}

interface PopupInteractionProps {
    isOpen: boolean;
    title: string;
    fields: Field[];
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onClose: () => void;
}

export default function PopupInteraction({
                                             isOpen,
                                             title,
                                             fields,
                                             confirmText = "Xác nhận",
                                             cancelText = "Hủy",
                                             onConfirm,
                                             onClose,
                                         }: PopupInteractionProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                <div className="space-y-4">
                    {fields.map((field) => (
                        <div key={field.name}>
                            <label className="block text-gray-700 mb-1">{field.label}</label>
                            {field.type === "text" ? (
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded"
                                    value={field.value}
                                    onChange={(e) => field.onChange(e.target.value)}
                                />
                            ) : field.type === "select" ? (
                                <select
                                    className="w-full p-2 border rounded"
                                    value={field.value}
                                    onChange={(e) => field.onChange(e.target.value)}
                                >
                                    <option value="">-- Chọn --</option>
                                    {field.options?.map((opt) => (
                                        <option key={opt} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                            ) : null}
                        </div>
                    ))}
                </div>

                <div className="flex justify-end mt-6 gap-3">
                    <button
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={onClose}
                    >
                        {cancelText}
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
