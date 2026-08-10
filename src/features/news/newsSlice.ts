import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { NewsArticle,NewsState, RSS2JSONResponse } from "./types";

const initialState : NewsState = {
    articles: [],
    loading: false,
    error: null,
}

export const fetchNews = createAsyncThunk<NewsArticle[], void, { rejectValue: string }>
(
    "news/fetchNews", async (_, thunkAPI) => {
        try{
            const response = await fetch(
        "https://api.rss2json.com/v1/api.json?rss_url=https://www.onlinekhabar.com/feed"
    );
            if(!response.ok){
                throw new Error("Failed to fetch news")
            }

            const data: RSS2JSONResponse = await response.json();

            return data.items.map(
                (item): NewsArticle => ({
                    title: item.title,
                    description: item.description || null,
                    url: item.link,
                    imageUrl: item.thumbnail || null,
                    publishedAt: item.pubDate,
                    source: data.feed.title,
                })
            )
        }catch{
            return thunkAPI.rejectWithValue("Failed to fetch News..")
        }
    }
)

const newsSlice = createSlice({
    name: "news",
    initialState,

    reducers:{
        clearNews:(state)=> {
            state.articles = [];
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(
            fetchNews.pending,
            (state) => {
                state.loading = true;
                state.error = null;
            }
        )
        .addCase(
            fetchNews.fulfilled,
            (state,action) => {
                state.loading = false;
                state.articles = action.payload;
            }
        )
        .addCase(
            fetchNews.rejected,
            (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Something went wrong"
            }
        )
    }
})

export const { clearNews } = newsSlice.actions;

export default newsSlice.reducer;