import classNames from 'classnames';
import styles from './hourly-forecast.module.scss';
import { WeatherIcon } from '../weather-icon/weather-icon';
import { HourlyForecastItem } from '../../types/weatherTypes';

export interface HourlyForecastProps {
    className?: string;
    temperatureUnit: string;
    forecast: HourlyForecastItem[];
}

export const HourlyForecast = ({ className, forecast, temperatureUnit }: HourlyForecastProps) => {
    return (
        <div className={styles.hf__wrapper}>
            <h3 className={classNames('text-lg', 'font-semibold', 'mb-4', styles.header1)}></h3>
            <div className={styles.scrollContainer}>
                {forecast.map((item, index) => (
                    <div key={index} className={classNames('flex-shrink-0', 'w-1/4', 'text-center', styles.div1)}>
                        <p className="text-sm">{item.time}</p>
                        <WeatherIcon code={item.weathercode} className="w-8 h-8 my-2 mx-auto" />
                        <p className="text-sm font-bold">
                            {Math.round(item.temperature)}°{temperatureUnit}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};
