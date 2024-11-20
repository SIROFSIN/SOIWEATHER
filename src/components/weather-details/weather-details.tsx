import classNames from 'classnames';
import styles from './weather-details.module.scss';
import * as LucideIcons from 'lucide-react';

export interface WeatherDetailsProps {
    className?: string;
    windSpeed: number | string;
    pressure: number | string;
    humidity: number | string;
}

export const WeatherDetails = ({ className, windSpeed, pressure, humidity }: WeatherDetailsProps) => {
    return (
        <div className={classNames('flex', 'justify-between', 'mt-8', 'text-center', styles.div1)}>
            <div>
                <LucideIcons.Wind className="w-6 h-6 mx-auto mb-2" />
                <p className="text-[0.9rem]">Ветер</p>
                <p className={classNames('font-bold', styles.p1)}>{windSpeed}</p>
            </div>
            <div>
                <LucideIcons.Gauge className="w-6 h-6 mx-auto mb-2" />
                <p className="text-[0.9rem]">Давление</p>
                <p className={classNames('font-bold', styles.p2)}>{pressure}</p>
            </div>
            <div>
                <LucideIcons.Droplet className="w-6 h-6 mx-auto mb-2" />
                <p className="text-[0.9rem]">Влажность</p>
                <p className={classNames('font-bold', styles.p3)}>{humidity}%</p>
            </div>
        </div>
    );
};
