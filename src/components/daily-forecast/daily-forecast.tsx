import classNames from 'classnames';
import styles from './daily-forecast.module.scss';
import { WeatherIcon } from '../weather-icon/weather-icon';
import { DailyForecastItem } from '../../types/weatherTypes';

export interface DailyForecastProps {
    className?: string;
    forecast: DailyForecastItem[];
    temperatureUnit: string;
}

export const DailyForecast = ({ className, forecast, temperatureUnit }: DailyForecastProps) => {
    return (
        <div className={styles.div1}>
            <h3 className="text-lg font-semibful mb-4">Прогноз на неделю</h3>
            <div className="space-y-2">
                {forecast.map((day, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <span className={styles.span1}>{day.date}</span>
                        <WeatherIcon code={day.weathercode} className="w-8 h-8" />
                        <span className={classNames('text-right', styles.span2)}>
                            {Math.round(day.temperatureMax)}°{temperatureUnit} /{Math.round(day.temperatureMin)}°{temperatureUnit}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
