'use client';

import { useLoading } from "@/app/context/loadingContext";

const GlobalLoading = () => {
    const { isLoading } = useLoading();

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-4 border-gray-300 border-t-blue-500 shadow-lg"></div>
        </div>
    );
};

export default GlobalLoading;
