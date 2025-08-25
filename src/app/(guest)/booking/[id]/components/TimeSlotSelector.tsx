'use client';

import React from 'react';

interface TimeSlot {
    id: number;
    time: string;
    max_patients: number;
    booked_count: number;
}

interface TimeSlotSelectorProps {
    slots: TimeSlot[];
    selectedSlotId: number | null;
    onSelect: (id: number) => void;
}

const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = (
  { slots, selectedSlotId, onSelect,} : TimeSlotSelectorProps
) => {
    if (slots.length === 0) return <p>Không có khung giờ khả dụng cho ngày này.</p>;

    return (
        <div className="grid grid-cols-4 gap-2 mb-4 ">
            {slots.map((slot) => {
                const isFull = slot.booked_count >= slot.max_patients;
                const isSelected = selectedSlotId === slot.id;

                return (
                    <button
                        key={slot.id}
                        type="button"
                        onClick={() => !isFull && onSelect(slot.id)}
                        disabled={isFull}
                        className={`py-2 px-3 rounded-md shadow-sm border text-center cursor-pointer hover:bg-blue-500 hover:text-white transition
                        ${
                            isFull
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : isSelected
                                    ? 'bg-blue-500/90 text-white'
                                    : 'bg-white text-gray-700'
                        }`}
                    >
                        {slot.time}
                    </button>
                );
            })}
        </div>
    );
};

export default TimeSlotSelector;
