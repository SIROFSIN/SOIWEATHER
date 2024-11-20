import React from 'react';

export interface SearchProps {
    className?: string;
    type?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

export const Search = React.forwardRef<HTMLInputElement, SearchProps>(
    ({ className, type, value, placeholder, onChange, ...props }, ref) => {
        return (
            <input
                ref={ref}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ paddingLeft: '1rem' }}
                {...props}
            />
        );
    }
);

Search.displayName = 'Search';
