import { createAsyncThunk, createSlice, type PayloadAction, } from "@reduxjs/toolkit";

import type { Location, LocationState } from "./types";


interface GeocodingResponse {
    results?: Array<{
        name: string;
        country: string;
        latitude: number;
        longitude: number;
    }>
}

export const searchLocation = createAsyncThunk<Location[], string,{
    rejectValue: string;
}>(
    "location/searchLocation",
    async(city, thunkAPI) => {
        try{
            const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);

            if(!response.ok){
                return thunkAPI.rejectWithValue("Failed to fetch Location");
            }

            const data: GeocodingResponse = await response.json();

            if(!data.results?.length){
                return thunkAPI.rejectWithValue("Location  not found")
            }

            return data.results.map((result)=>({

                name: result.name,
                country: result.country,
                coordinates: {
                    latitude: result.latitude,
                    longitude: result.longitude
            }
        })) 
        }catch{
            return thunkAPI.rejectWithValue("Something went wrong while fetching location")
        }
    }
)
const initialState: LocationState = {
    results:[],
    selected: null,
    loading:false,
    error: null,
}

const locationSlice = createSlice({
    name:"location",
    initialState,
    reducers: {
      selectLocation:  (state,
        action: PayloadAction<Location>)=> {
            state.selected = action.payload;
            state.results = [];
            state.error = null;
        } ,
        clearLocation : (state)=>{
            state.results = [];
            state.selected = null;
            state.error = null;
        }     
      },
    
    extraReducers:(builder) => {
        builder.addCase(
            searchLocation.pending,
            (state)=> {
                state.loading = true;
                state.error = null;
            }
        )
        .addCase(
            searchLocation.fulfilled,
            (state, action) => {
                state.loading = false;
                state.results = action.payload;
                state.error = null;
            }
        )
        .addCase(
            searchLocation.rejected,
            (state, action) => {
                state.loading = false;
                state.selected = null;
                state.error = action.payload ?? "Failed to find location"
            }
        )
    }
})

export const { clearLocation, selectLocation } = locationSlice.actions;
export default locationSlice.reducer;