import Image from "next/image";
import { GET_IMAGE_API } from "@/lib/api/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {toPriceVND} from "@/lib/function/toPriceVND";

interface ServiceCardProps {
    url_image: string | null;
    title: string;
    description: string;
    price: number;
    is_active?: boolean;
    onClick?: () => void;
    index?: number;
}

const gradients = [
    "from-teal-400 via-cyan-400 to-blue-400",
    "from-pink-400 via-fuchsia-400 to-purple-500",
    "from-amber-400 via-orange-400 to-red-400",
    "from-green-400 via-emerald-400 to-teal-500",
];

export function ServiceCardHome(props: ServiceCardProps) {
    const { url_image, title, description, price, is_active, onClick, index = 0 } = props;
    const [imageError, setImageError] = useState(false);
    
    const imageSrc =
        url_image && !imageError ? GET_IMAGE_API(url_image) : "/placeholder.png";
    
    const gradient = gradients[index % gradients.length];
    
    return (
        <motion.div
            className={`relative rounded-3xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-white dark:bg-gray-900`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
        >
            {/* Image Section */}
            <div className={`relative w-full h-45 bg-gradient-to-br ${gradient}`}>
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover rounded-t-3xl"
                    onError={() => setImageError(true)}
                />
                {is_active !== undefined && (
                    <Badge
                        className={`absolute top-3 right-3 px-3 py-1 rounded-full shadow-md ${
                            is_active ? "bg-green-500" : "bg-red-500"
                        } text-white text-xs font-medium`}
                    >
                        {is_active ? "Hoạt động" : "Không hoạt động"}
                    </Badge>
                )}
            </div>
            
            {/* Content Section */}
            <div className="p-6 flex flex-col justify-between h-50">
                <div>
                    <h3 className="text-xl font-semibold font-sans text-gray-900 dark:text-gray-100 mb-3 line-clamp-1 tracking-wide">
                        {title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
                        {description}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
                        {price ? `Giá: ${toPriceVND(price)}` : "Giá: Liên hệ" }
                    </p>
                </div>
                
                {onClick && (
                    <Button
                        onClick={onClick}
                        className="mt-4 w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-medium tracking-wide hover:from-teal-600 hover:to-cyan-700 transition-all duration-300 rounded-full shadow-md cursor-pointer"
                    >
                        Đặt lịch khám ngay
                    </Button>
                )}
            </div>
        </motion.div>
    );
}
