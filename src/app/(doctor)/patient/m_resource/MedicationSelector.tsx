'use client';

import { useState } from "react";
import { X, AlertCircle } from "lucide-react";
import { useSearchMedications } from "@/libs/hooks/medications/useSearchMedications";
import { useDebounce } from "use-debounce";
import {Medication} from "@/types/medications";

interface Props {
    selected: Medication[];
    onChange: (selected: Medication[]) => void;
    error?: string;
}

export default function MedicationSelector({ selected, onChange, error }: Props) {
    const [keyword, setKeyword] = useState("");
    const [debouncedKeyword] = useDebounce(keyword, 300);

    const { medications } = useSearchMedications(debouncedKeyword);

    const handleSelect = (med: Medication) => {
        if (selected.find((m) => m.id === med.id)) return;
        onChange([...selected, med]);
        setKeyword(""); // reset keyword sau khi chọn
    };

    const handleRemove = (id: number) => {
        onChange(selected.filter((m) => m.id !== id));
    };

    return (
        <div className="col-span-1 sm:col-span-2">
        <label className="block font-medium mb-1 text-gray-700">Tìm thuốc</label>
    <input
    type="text"
    placeholder="Nhập tên thuốc để tìm"
    value={keyword}
    onChange={(e) => setKeyword(e.target.value)}
    className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
        error ? "border-red-500" : "border-gray-300"
    }`}
    />

    {keyword && medications.length > 0 && (
        <ul className="mt-2 max-h-40 overflow-y-auto border border-gray-200 rounded-lg bg-white shadow">
            {medications.map((med) => (
                    <li
                        key={med.id}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                onClick={() => handleSelect(med)}
    >
        {med.name} {med.acronym && `(${med.acronym})`}
        </li>
    ))}
        </ul>
    )}

    <div className="flex flex-wrap gap-2 mt-2">
        {selected.map((med) => (
                <span
                    key={med.id}
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-1"
                >
                {med.name}
                <button
            onClick={() => handleRemove(med.id)}
    className="hover:text-red-500"
    >
    <X className="w-4 h-4" />
        </button>
        </span>
))}
    </div>

    {error && (
        <p className="text-red-500 text-sm mt-1 flex items-center">
        <AlertCircle className="w-4 h-4 mr-1" /> {error}
            </p>
    )}
    </div>
);
}
