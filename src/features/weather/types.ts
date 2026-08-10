export interface CurrentWeather {
    temperature: number;
    windSpeed: number;
    weatherCode: number;
}

export interface WeatherData {
    latitude: number;
    longitude: number;
    timezone: string;
    current: CurrentWeather;
}

export interface WeatherState {
    data: WeatherData | null ;
    loading: boolean;
    error: string | null;
}