import React from 'react';
import * as LucideIcons from 'lucide-react';
import { getWeatherDescription } from '../../utils/getWeatherDescriptionService';

// Импортируем 3D иконки
import sunIcon from '../../assets/3dweathericons/sun/26.png';
import mostlySunIcon from '../../assets/3dweathericons/sun/6.png';
import partlyCloudyIcon from '../../assets/3dweathericons/sun/27.png';
import cloudIcon from '../../assets/3dweathericons/cloud/35.png';
import rainIcon from '../../assets/3dweathericons/cloud/7.png';
import snowIcon from '../../assets/3dweathericons/cloud/23.png';
import lightningIcon from '../../assets/3dweathericons/cloud/17.png';
import styles from './weather-icon.module.scss';

// Определяем тип для ключей iconMap
type WeatherDescription = keyof typeof iconMap;

export interface WeatherIconProps {
    className?: string;
    code: number;
}

const iconMap = {
    Ясно: { src: sunIcon, alt: 'Ясно' },
    'Преимущественно ясно': { src: mostlySunIcon, alt: 'Преимущественно ясно' },
    'Переменная облачность': { src: partlyCloudyIcon, alt: 'Переменная облачность' },
    Пасмурно: { src: cloudIcon, alt: 'Пасмурно' },
    Туман: { src: cloudIcon, alt: 'Туман' },
    'Туман с изморозью': { src: cloudIcon, alt: 'Туман с изморозью' },
    'Легкая морось': { src: rainIcon, alt: 'Легкая морось' },
    'Умеренная морось': { src: rainIcon, alt: 'Умеренная морось' },
    'Сильная морось': { src: rainIcon, alt: 'Сильная морось' },
    'Небольшой дождь': { src: rainIcon, alt: 'Небольшой дождь' },
    'Умеренный дождь': { src: rainIcon, alt: 'Умеренный дождь' },
    'Сильный дождь': { src: rainIcon, alt: 'Сильный дождь' },
    'Небольшой снег': { src: snowIcon, alt: 'Небольшой снег' },
    'Умеренный снег': { src: snowIcon, alt: 'Умеренный снег' },
    'Сильный снегопад': { src: snowIcon, alt: 'Сильный снегопад' },
    Гроза: { src: lightningIcon, alt: 'Гроза' },
    Неизвестно: { src: cloudIcon, alt: 'Неизвестно' }
} as const;

export const WeatherIcon = ({ className, code }: WeatherIconProps) => {
    const weatherDescription = getWeatherDescription(code);
    console.log('Weather Code:', code, 'Description:', weatherDescription);
    const icon = iconMap[weatherDescription as WeatherDescription] || iconMap['Неизвестно'];

    return (
        <div className={styles.div1}>
            <img
                src={icon.src}
                alt={icon.alt}
                className={className}
                loading="lazy"
                decoding="async"
                fetchPriority="high"
                style={{ objectFit: 'contain', position: 'relative', width: '250px', margin: '0px' }}
            />
        </div>
    );
};
