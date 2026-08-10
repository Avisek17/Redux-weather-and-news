import { configureStore } from "@reduxjs/toolkit";
import locationReducer from '../features/location/locationSlice';
import weatherReducer from '../features/weather/weatherSlice';
import newsReducer from '../features/news/newsSlice'
import themeReducer from '../features/theme/themeSlice'
export const store = configureStore({
    reducer:{
        location: locationReducer,
        weather: weatherReducer,
        news: newsReducer,
        theme: themeReducer
    },
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;