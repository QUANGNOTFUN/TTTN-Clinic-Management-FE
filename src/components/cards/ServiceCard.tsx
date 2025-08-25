import { FC } from 'react';

interface ServiceCardProps {
    icon: string;
    title: string;
    description: string;
}

const ServiceCard: FC<ServiceCardProps> = ({ icon, title, description }) => {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center transform hover:scale-105 transition-transform">
            <div className="text-4xl mb-4">{icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{description}</p>
        </div>
    );
};

export default ServiceCard;
