// ActionCell.tsx
import {Pencil, Trash2, View} from "lucide-react";

export default function ActionCell({ onView, onUpdate, onDelete }: {
    onView: () => void;
    onUpdate: () => void;
    onDelete: () => void;
}) {
    return (
        <div className="flex space-x-2">
            <button title="Xem" className="text-blue-500 hover:text-blue-700" onClick={onView}><View className="w-5 h-5" /></button>
            <button title="Sửa" className="text-yellow-500 hover:text-yellow-700" onClick={onUpdate}><Pencil className="w-5 h-5" /></button>
            <button title="Xóa" className="text-red-500 hover:text-red-700" onClick={onDelete}><Trash2 className="w-5 h-5" /></button>
        </div>
    );
}
