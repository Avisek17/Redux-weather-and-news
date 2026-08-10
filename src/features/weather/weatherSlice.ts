import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { WeatherData, WeatherState} from './types'

interface WeatherApiResponse {
    latitude: number;
    longitude: number;
    timezone: string;

    current:{
        temperature_2m: number;
        wind_speed_10m: number;
        weather_code: number;
    }
}

export const fetchWeather = createAsyncThunk<WeatherData,
{
    latitude: number;
    longitude: number;
},
{
    rejectValue: string;
}>(
    "weather/fetchWeather",
    async({latitude, longitude},thunkAPI) => {
        try{
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,weather_code&timezone=auto`);

            if(!response.ok){
                return thunkAPI.rejectWithValue("Failed to fetch weather");
            }
            
            const data: WeatherApiResponse = await response.json();

            return {
                latitude: data.latitude,
                longitude: data.longitude,
                timezone: data.timezone,
                current: {
                    temperature: data.current.temperature_2m,
                    windSpeed: data.current.wind_speed_10m,
                    weatherCode: data.current.weather_code
                }
            }
        }catch{
            return thunkAPI.rejectWithValue("Something went wrong while fetching weather");
        }
    }
)

const initialState : WeatherState = {
    data: null,
    loading: false,
    error: null
}

const weatherSlice = createSlice({
    name:"weather",
    initialState,
    reducers: {
        clearWeather:(state)=> {
            state.data = null;
            state.error = null;
        }
    },
    extraReducers:(buider) => {
        buider
            .addCase(
                fetchWeather.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addCase(
                fetchWeather.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.data = action.payload;
                    state.error =  null;
                }
            )
            .addCase(
                fetchWeather.rejected,
                (state, action) => {
                    state.loading = false;
                    state.data = null;

                    state.error = action.payload ?? "Failed to fetch Weather";
                }
            )
    }
});

export const { clearWeather} = weatherSlice.actions;

export default weatherSlice.reducer;