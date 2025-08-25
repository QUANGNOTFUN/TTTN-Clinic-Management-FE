"use client";

import { useGetOnePost } from "@/libs/hooks/posts/useGetOnePost";
import { useEffect } from "react";
import { use } from "react";
import { motion } from "framer-motion";
import {ArrowLeft, Calendar, Tag, User } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
    params: Promise<{ id: string }>;
}

export default function PostDetailPage({ params }: Props) {
    const { id } = use(params);
    const { getPostById, data, loading, error } = useGetOnePost();
    const router = useRouter();


    useEffect(() => {
        if (id) {
            getPostById(Number(id));
        }
    }, [id, getPostById]);

    const formatDate = (date: string | null) => {
        if (!date) return "Không rõ ngày";
        return new Date(date).toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                >
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Đang tải bài viết...</p>
                </motion.div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center p-6 bg-red-50 rounded-lg shadow-lg"
                >
                    <p className="text-red-600 text-lg font-semibold">Lỗi: {error.message}</p>
                    <button
                        onClick={() => getPostById(id)}
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                        Thử lại
                    </button>
                </motion.div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center p-6 bg-gray-100 rounded-lg shadow-lg"
                >
                    <p className="text-gray-600 text-lg font-semibold">Bài viết không tồn tại</p>
                    {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                    <a
                        href="/"
                        className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Quay về trang chủ
                    </a>
                </motion.div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gray-50 py-12"
        >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                        {data.title}
                    </h1>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-gray-600 text-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-0">
                            <div className="flex items-center">
                                <User className="w-4 h-4 mr-2 text-blue-500" />
                                <span>Tác giả: {data.author.user.full_name || "Ẩn danh"}</span>
                            </div>
                            <div className="flex items-center">
                                <Tag className="w-4 h-4 mr-2 text-blue-500" />
                                <span>Thể loại: {data.category || "Không xác định"}</span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                            <span>
                Đăng ngày: {formatDate(data.created_at)}
                                {data.updated_at && (
                                    <span className="ml-2">
                    (Cập nhật: {formatDate(data.updated_at)})
                  </span>
                                )}
              </span>
                        </div>
                    </div>
                </header>

                <article className="bg-white rounded-lg shadow-lg p-8">
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                        {data.content.split("\n").map((paragraph, index) => (
                            <p key={index} className="mb-4">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </article>

                <div className="mt-10 text-center">
                    <button
                        onClick={() => router.back()}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-base font-medium shadow-md"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Quay lại
                    </button>
                </div>
            </div>
        </motion.div>
    );
}