import React from 'react';
export interface ActionButtonProps {
    className?: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    type?: 'submit' | 'button';
}
export const ActionButton = ({ className, icon, onClick, type = 'button' }: ActionButtonProps) => {
    return (
        <button 
            type={type} 
            onClick={onClick} 
            className={`p-2 rounded-full hover:bg-white dark:hover:bg-white [&>svg]:hover:text-gray-900 dark:[&>svg]:hover:text-black [&>svg]:transition-colors transition-all duration-200 ${className}`}
        >
            {icon}
        </button>
    );
};
