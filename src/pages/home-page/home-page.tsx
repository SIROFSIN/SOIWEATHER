import classNames from 'classnames';
import styles from './home-page.module.scss';
import { SetStateAction, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { WeatherIcon } from '../../components/weather-icon/weather-icon';
import { WeatherDetails } from '../../components/weather-details/weather-details';
import { HourlyForecast } from '../../components/hourly-forecast/hourly-forecast';
import { DailyForecast } from '../../components/daily-forecast/daily-forecast';
import { ActionButton } from '../../components/action-button/action-button';
import { SettingsPage } from '../settings-page/settings-page';
import { Settings, WeatherData, HourlyForecastItem, DailyForecastItem } from '../../types/weatherTypes';
import * as LucideIcons from 'lucide-react';
import { getWeatherDescription } from '../../utils/getWeatherDescriptionService';
import { CurrentTemp } from '../../components/current-temp/current-temp';
import { Search } from '../../components/search/search';
import { WeatherSkeleton, WeeklyForecastSkeleton } from '../../components/skeleton/skeleton';

export interface HomePageProps {
    className?: string;
    onSettingsChange?: (settings: Settings) => void;
    theme?: 'light' | 'dark';
}

export const HomePage = ({ className, onSettingsChange, theme }: HomePageProps) => {
    const [city, setCity] = useState<string>('Москва');
    const [country, setCountry] = useState<string>('Россия');
    const [searchInput, setSearchInput] = useState<string>('');
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [hourlyForecast, setHourlyForecast] = useState<HourlyForecastItem[]>([]);
    const [dailyForecast, setDailyForecast] = useState<DailyForecastItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
    const [isSettingsVisible, setIsSettingsVisible] = useState<boolean>(false);
    const [settings, setSettings] = useState<Settings>({
        temperatureUnit: 'C',
        windSpeedUnit: 'ms',
        theme: 'light'
    });

    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const initializeWeather = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await axios.get('http://ipwho.is/');
                const data = response.data;

                if (!data.success) {
                    throw new Error('Не удалось определить город по IP');
                }

                setCity(data.city);
                setCountry(data.country);
                await fetchWeather(data.city);
            } catch (error) {
                console.error('Ошибка при получении местоположения:', error);
                setError('Не удалось определить ваше местоположение. Используем город по умолчанию.');
                setCity('Москва');
                setCountry('Россия');
                await fetchWeather('Москва');
            } finally {
                setLoading(false);
            }
        };

        const fetchData = async () => {
            if (!city) return;
            setLoading(true);
            setError(null);
            try {
                // Добавляем искусственную задержку в 3 секунды
                await new Promise((resolve) => setTimeout(resolve, 3000));

                const response = await axios.get('http://ipwho.is/');
                const data = response.data;

                if (!data.success) {
                    throw new Error('Не удалось определить город по IP');
                }

                setCity(data.city);
                setCountry(data.country);
                await fetchWeather(data.city);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Произошла ошибка при загрузке данных');
            } finally {
                setLoading(false);
            }
        };

        initializeWeather();
    }, []); // Выполняется только при монтировании

    useEffect(() => {
        applyTheme();
    }, [settings.theme]);

    const fetchWeather = async (cityName: string) => {
        setLoading(true);
        setError(null);
        try {
            // Добавляем искусственную задержку в 3 секунды
            await new Promise((resolve) => setTimeout(resolve, 3000));

            const geocodingResponse = await axios.get('https://geocoding-api.open-meteo.com/v1/search', {
                params: { name: cityName, count: 1, language: 'ru', format: 'json' }
            });

            if (!geocodingResponse.data.results || geocodingResponse.data.results.length === 0) {
                throw new Error('Город не найден');
            }

            const { latitude, longitude, country: countryName, name } = geocodingResponse.data.results[0];

            const weatherResponse = await axios.get('https://api.open-meteo.com/v1/forecast', {
                params: {
                    latitude,
                    longitude,
                    current: 'temperature_2m,weathercode,windspeed_10m,relative_humidity_2m,pressure_msl',
                    hourly: 'temperature_2m,weathercode',
                    daily: 'weathercode,temperature_2m_max,temperature_2m_min',
                    timezone: 'auto',
                    forecast_days: 8,
                    language: 'ru'
                }
            });

            const current = {
                temperature: weatherResponse.data.current.temperature_2m,
                weathercode: weatherResponse.data.current.weathercode,
                windspeed: weatherResponse.data.current.windspeed_10m,
                humidity: weatherResponse.data.current.relative_humidity_2m,
                pressure: weatherResponse.data.current.pressure_msl
            };

            const currentHour = new Date().getHours();
            const hourly = weatherResponse.data.hourly.time
                .slice(currentHour, currentHour + 24)
                .map((time: string | number | Date, index: number) => ({
                    time: new Date(time).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
                    temperature: weatherResponse.data.hourly.temperature_2m[currentHour + index],
                    weathercode: weatherResponse.data.hourly.weathercode[currentHour + index]
                }));

            const daily = weatherResponse.data.daily.time.slice(1).map((time: string | number | Date, index: number) => ({
                date: new Date(time).toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric', month: 'short' }),
                temperatureMax: weatherResponse.data.daily.temperature_2m_max[index + 1],
                temperatureMin: weatherResponse.data.daily.temperature_2m_min[index + 1],
                weathercode: weatherResponse.data.daily.weathercode[index + 1]
            }));

            setWeather(current);
            setHourlyForecast(hourly);
            setDailyForecast(daily);
            setCity(name);
            setCountry(countryName);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Неизвестная ошибка');
            setWeather(null);
            setHourlyForecast([]);
            setDailyForecast([]);
        } finally {
            setLoading(false);
        }
    };

    const toggleSearch = () => {
        if (isSearchVisible) {
            setIsSearchVisible(false);
            setSearchInput('');
        } else {
            setIsSearchVisible(true);
            setTimeout(() => {
                searchInputRef.current?.focus();
            }, 100);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchInput.trim()) {
            const newCity = searchInput.trim();
            setCity(newCity);
            fetchWeather(newCity);
            setSearchInput('');
            setIsSearchVisible(false);
        }
    };

    const toggleSettings = () => {
        setIsSettingsVisible(!isSettingsVisible);
    };

    const applyTheme = () => {
        if (settings.theme === 'system') {
            const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.classList.toggle('dark', isDarkMode);
            localStorage.setItem('settings', JSON.stringify({ ...settings, theme: isDarkMode ? 'dark' : 'light' }));
        } else {
            document.documentElement.classList.toggle('dark', settings.theme === 'dark');
        }
    };

    const convertTemperature = (celsius: number) => {
        if (settings.temperatureUnit === 'F') {
            return (celsius * 9) / 5 + 32;
        }
        return celsius;
    };

    const convertWindSpeed = (kmh: number) => {
        switch (settings.windSpeedUnit) {
            case 'kmh':
                return kmh;
            case 'ms':
                return kmh * 0.277778;
            case 'mph':
                return kmh * 0.621371;
            case 'knots':
                return kmh * 0.539957;
            default:
                return kmh;
        }
    };

    const windSpeedUnits = {
        ms: 'м/с',
        kmh: 'км/ч',
        mph: 'миль/ч',
        knots: 'узлов'
    };

    const formatWindSpeed = (speed: number) => {
        const converted = convertWindSpeed(speed);
        return `${converted.toFixed(1)} ${windSpeedUnits[settings.windSpeedUnit]}`;
    };

    const convertPressure = (hPa: number) => {
        return Math.round(hPa * 0.750062);
    };

    const getWeatherType = (code: number): string => {
        if (code === 0) return 'clear-sky';
        if (code === 1 || code === 2) return 'few-clouds';
        if (code === 3) return 'scattered-clouds';
        if (code === 45 || code === 48) return 'mist';
        if (code >= 51 && code <= 55) return 'shower-rain';
        if (code >= 61 && code <= 65) return 'rain';
        if (code >= 71 && code <= 77) return 'snow';
        if (code >= 80 && code <= 82) return 'shower-rain';
        if (code >= 95 && code <= 99) return 'thunderstorm';
        return 'few-clouds';
    };

    const bgColor = theme === 'dark' ? 'bg-[#0f0f0f]' : 'bg-white';
    const textColor = theme === 'dark' ? 'text-white' : 'text-black';
    return (
        <div className={classNames('weather-app', 'min-h-screen', 'font-sans', 'transition-colors', 'duration-300', styles.div4)}>
            <div className={classNames('mx-auto', styles.div5)}>
                <div className={styles['main-weather-info']} data-weather={weather ? getWeatherType(weather.weathercode) : 'few-clouds'}>
                    <header className={styles.header}>
                        <ActionButton
                            icon={<LucideIcons.Settings className="w-6 h-6 dark:group-hover:text-black" />}
                            onClick={toggleSettings}
                            className="group relative z-20"
                        />
                        <h1 className={classNames('text-2xl font-bold', { 'opacity-0': isSearchVisible })}>Погода</h1>
                        <div className={classNames(styles.searchContainer, { [styles.visible]: isSearchVisible })}>
                            <form onSubmit={handleSearch} className="flex items-center w-full">
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    placeholder="Введите город"
                                    className={styles.searchInput}
                                />
                            </form>
                        </div>
                        <ActionButton
                            icon={
                                isSearchVisible ? (
                                    <LucideIcons.X className="w-6 h-6 dark:group-hover:text-black" />
                                ) : (
                                    <LucideIcons.Search className="w-6 h-6 dark:group-hover:text-black" />
                                )
                            }
                            onClick={toggleSearch}
                            className="group relative z-20"
                        />
                    </header>
                    {loading ? (
                        <WeatherSkeleton />
                    ) : (
                        <div className={styles.fadeIn}>
                            {weather && (
                                <>
                                    <div className={styles.div3}>
                                        <WeatherIcon code={weather.weathercode} className="mx-auto" />
                                    </div>
                                    <CurrentTemp temperature={convertTemperature(weather.temperature)} unit={settings.temperatureUnit} />
                                    <p className="text-xl mt-2">
                                        {city.toUpperCase()}, {country.toUpperCase()}
                                    </p>
                                    <p className="text-lg">{getWeatherDescription(weather.weathercode)}</p>
                                </>
                            )}
                        </div>
                    )}
                    {weather && (
                        <WeatherDetails
                            windSpeed={formatWindSpeed(convertWindSpeed(weather.windspeed))}
                            humidity={weather.humidity}
                            pressure={`${convertPressure(weather.pressure)} мм рт.ст.`}
                        />
                    )}
                    <HourlyForecast forecast={hourlyForecast} temperatureUnit={settings.temperatureUnit} className={styles.hourlyForecast} />
                </div>
            </div>

            <main className={styles.main1}>
                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                {loading ? (
                    <WeeklyForecastSkeleton />
                ) : (
                    <div className={styles.fadeIn}>
                        <DailyForecast forecast={dailyForecast} temperatureUnit={settings.temperatureUnit} />
                    </div>
                )}
            </main>
            {isSettingsVisible && (
                <SettingsPage
                    settings={settings}
                    onSettingsChange={setSettings}
                    onClose={toggleSettings}
                    theme={
                        settings.theme === 'system' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : settings.theme
                    }
                />
            )}
        </div>
    );
};
