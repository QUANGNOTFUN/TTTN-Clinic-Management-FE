"use client";

import PostCard from "@/components/cards/PostCard";
import { useGetAllPost } from "@/libs/hooks/posts/useGetPost";
import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function Home() {
    const [page, setPage] = useState(1);
    const [pageSize] = useState(6); // Increased to 6 for better grid layout
    const { posts, total, loading: getLoading, error: getError, refetch: refetchPosts } = useGetAllPost({ page, pageSize });

    const totalPages = Math.ceil(total / pageSize);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    if (getLoading && page === 1) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                >
                    <Loader2 className="animate-spin h-12 w-12 text-blue-500 mx-auto mb-4" />
                    <p className="text-gray-600 text-lg">Đang tải bài viết...</p>
                </motion.div>
            </div>
        );
    }

    if (getError) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center p-6 bg-red-50 rounded-lg shadow-lg"
                >
                    <p className="text-red-600 text-lg font-semibold">Lỗi: {getError.message}</p>
                    <button
                        onClick={() => refetchPosts()}
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                        Thử lại
                    </button>
                </motion.div>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center p-6 bg-gray-100 rounded-lg shadow-lg"
                >
                    <p className="text-gray-600 text-lg font-semibold">Chưa có bài viết nào</p>
                    {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                    <a
                        href="/"
                        className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Tải lại trang
                    </a>
                </motion.div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gray-50 py-20"
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                    Blog Posts
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-12 flex justify-center space-x-2">
                        <button
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 1}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
                        >
                            Trước
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => index + 1).map((p) => (
                            <button
                                key={p}
                                onClick={() => handlePageChange(p)}
                                className={`px-4 py-2 rounded-lg ${
                                    p === page
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                } transition-colors`}
                            >
                                {p}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page === totalPages}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
                        >
                            Sau
                        </button>
                    </div>
                )}
            </div>
        </motion.div>
    );
}