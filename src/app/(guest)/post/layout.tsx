import Header from "@/components/header/Header";
import React from "react";
import Footer from "@/components/footer/Footer";

function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
            {/* Header */}
            <Header />
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-left text-gray-800 mb-6">Tin tức gần đây</h1>
                {children}
            </div>
        </div>
    );
}

export default Layout;
