"use client";

import { Post } from "@/types/posts";
import { FC } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Tag, User } from "lucide-react";

interface Props {
    post: Post;
}

const PostCard: FC<Props> = ({ post }) => {
    const formatDate = (date: Date) => {
        if (!date) return "Không rõ ngày";
        return new Date(date).toLocaleDateString("vi-VN", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
            <Link href={`/post/${post.id}`} className="block">
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
                        {post.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {post.content || "Không có nội dung"}
                    </p>
                    <div className="flex flex-col space-y-2 text-sm text-gray-500">
                        <div className="flex items-center">
                            <User className="w-4 h-4 mr-2 text-blue-500" />
                            <span>Tác giả: {post.author?.user?.full_name || "Ẩn danh"}</span>
                        </div>
                        <div className="flex items-center">
                            <Tag className="w-4 h-4 mr-2 text-blue-500" />
                            <span>Thể loại: {post.category || "Không xác định"}</span>
                        </div>
                        <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                            <span>{formatDate(post.created_at)}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default PostCard;