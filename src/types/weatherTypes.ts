 export interface WeatherData {
    temperature: number;
    weathercode: number;
    windspeed: number;
    humidity: number;
    pressure: number;
}

export interface HourlyForecastItem {
    time: string;
    temperature: number;
    weathercode: number;
}

export interface DailyForecastItem {
    date: string;
    temperatureMax: number;
    temperatureMin: number;
    weathercode: number;
}

export interface Settings {
    temperatureUnit: 'C' | 'F';
    windSpeedUnit: 'ms' | 'kmh' | 'mph' | 'knots';
    theme: 'system' | 'light' | 'dark';
}