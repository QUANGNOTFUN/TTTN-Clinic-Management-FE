"use client"

import { useState } from "react";

export default function SettingPage() {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
            <div className="p-4">
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Đổi nền
                </button>

                <p className="mt-4">Nội dung ở đây...</p>
            </div>
        </div>
    );
}
