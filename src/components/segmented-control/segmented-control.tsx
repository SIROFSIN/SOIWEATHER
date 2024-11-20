import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const SegmentedControl: React.FC<{
    options: { value: string; label: string }[];
    value: string;
    onChange: (value: string) => void;
    className?: string;
}> = ({ options, value, onChange, className }) => {
    const controlRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const activeButton = controlRef.current?.querySelector(`[data-value="${value}"]`);
        if (activeButton) {
            gsap.to(activeButton, {
                backgroundColor: 'white',
                color: '#1a202c',
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    }, [value]);

    const handleClick = (clickedValue: string) => {
        const buttons = controlRef.current?.querySelectorAll('button');
        buttons?.forEach((button) => {
            if (button.dataset.value === clickedValue) {
                gsap.to(button, {
                    backgroundColor: 'white',
                    color: '#1a202c',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            } else {
                gsap.to(button, {
                    backgroundColor: 'transparent',
                    color: 'white',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
        onChange(clickedValue);
    };
    return (
        <div ref={controlRef} className={`flex rounded-lg bg-gray-700 p-1 ${className}`}>
            {options.map((option) => (
                <button
                    key={option.value}
                    data-value={option.value}
                    className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-300 ${value === option.value ? 'bg-white text-gray-900' : 'text-white hover:bg-gray-600'}`}
                    onClick={() => handleClick(option.value)}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
};