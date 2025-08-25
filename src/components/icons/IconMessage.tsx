import { MessageCircle } from "lucide-react";
import Link from "next/link";

interface IconMessageProps {
    isVisible: boolean;
}

const IconMessage: React.FC<IconMessageProps> = ({ isVisible }) => {
    if (!isVisible) {
        return null;
    }

    return (
        <Link href="/contact">
            <button
                className="fixed bottom-16 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transform hover:scale-110 transition-transform z-50"
                aria-label="Open chat support"
            >
                <MessageCircle size={24} />
            </button>
        </Link>
    );
};

export default IconMessage;