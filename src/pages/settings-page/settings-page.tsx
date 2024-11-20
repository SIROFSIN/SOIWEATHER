import classNames from 'classnames';
import styles from './settings-page.module.scss';
import { gsap } from 'gsap';
import * as LucideIcons from 'lucide-react';
import { SegmentedControl } from '../../components/segmented-control/segmented-control';
import { Settings } from '../../types/weatherTypes';
import { useEffect, useRef } from 'react';
import { ActionButton } from '../../components/action-button/action-button';

export interface SettingsPageProps {
    className?: string;
    settings: Settings;
    onSettingsChange: (settings: Settings) => void;
    onClose: () => void;
    theme: 'light' | 'dark';
}

export const SettingsPage = ({ className, settings, onSettingsChange, onClose, theme }: SettingsPageProps) => {
    const settingsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.from(settingsRef.current, {
            x: '100%',
            duration: 0.5,
            ease: 'power2.out'
        });
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleChange = (key: keyof Settings, value: string) => {
        onSettingsChange({ ...settings, [key]: value });
        localStorage.setItem('settings', JSON.stringify({ ...settings, [key]: value }));
    };

    const handleClose = () => {
        gsap.to(settingsRef.current, {
            x: '100%',
            duration: 0.5,
            ease: 'power2.in',
            onComplete: onClose
        });
    };

    const bgColor = theme === 'dark' ? 'bg-[#0f0f0f]' : 'bg-white';
    const textColor = theme === 'dark' ? 'text-white' : 'text-white';

    return (
        <div ref={settingsRef} className={classNames('fixed', 'inset-0', bgColor, textColor, 'shadow-lg', 'p-6', 'z-50', styles.div1)}>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Настройки</h2>
                <ActionButton icon={<LucideIcons.X />} onClick={handleClose} />
            </div>
            <div className="space-y-6">
                <div>
                    <label className="block mb-2 text-lg font-medium">Температура</label>
                    <SegmentedControl
                        options={[
                            { value: 'C', label: '°C' },
                            { value: 'F', label: '°F' }
                        ]}
                        value={settings.temperatureUnit}
                        onChange={(value) => handleChange('temperatureUnit', value)}
                        className="w-full"
                    />
                </div>
                <div>
                    <label className="block mb-2 text-lg font-medium">Сила ветра</label>
                    <SegmentedControl
                        options={[
                            { value: 'ms', label: 'м/с' },
                            { value: 'kmh', label: 'км/ч' },
                            { value: 'mph', label: 'миль/ч' },
                            { value: 'knots', label: 'узлы' }
                        ]}
                        value={settings.windSpeedUnit}
                        onChange={(value) => handleChange('windSpeedUnit', value)}
                        className="w-full"
                    />
                </div>
            </div>
        </div>
    );
};
