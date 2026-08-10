import { useState } from "react";
import "./Home.css";

import {
    useAppDispatch,
    useAppSelector,
} from "../app/hooks";

import {
    searchLocation,
    selectLocation,
} from "../features/location/locationSlice";

import {
    fetchWeather,
} from "../features/weather/weatherSlice";
export function Home() {
        const dispatch = useAppDispatch();

    const [city, setCity] = useState("");

    const {
        results,
        selected,
        loading,
        error,
    } = useAppSelector(
        (state) => state.location
    );

    const {
        data: weather,
        loading: weatherLoading,
        error: weatherError,
    } = useAppSelector(
        (state) => state.weather
    );

    const handleSearch = () => {
        const trimmedCity = city.trim();

        if (!trimmedCity) {
            return;
        }

        dispatch(
            searchLocation(trimmedCity)
        );
    };
    return(
               <div className="home">

            {/* =========================
                Header
            ========================== */}

            <header className="app-header">
                

                <p className="app-subtitle">
                    Search a location and view
                    its current weather.
                </p>
            </header>


            {/* =========================
                Location Search
            ========================== */}

            <section className="search-section">

                <div className="search-box">

                    <input
                        className="search-input"
                        type="text"
                        value={city}
                        onChange={(event) =>
                            setCity(
                                event.target.value
                            )
                        }
                        placeholder="Search location"
                    />

                    <button
                        className="search-button"
                        type="button"
                        onClick={handleSearch}
                        disabled={loading}
                    >
                        {loading
                            ? "Searching..."
                            : "Search"}
                    </button>

                </div>

            </section>


            {/* =========================
                Location Error
            ========================== */}

            {error && (
                <p className="error-message">
                    {error}
                </p>
            )}


            {/* =========================
                Search Results
            ========================== */}

            {results.length > 0 && (
                <section className="search-results">

                    <h2 className="section-title">

                        Search Results
                    </h2>
                    <p> Click the below location name to see the weather.</p>

                    <div className="location-list">

                        {results.map(
                            (
                                location,
                                index
                            ) => (
                                <button
                                    className="location-button"
                                    type="button"
                                    key={`${location.name}-${location.country}-${index}`}
                                    onClick={() => {

                                        dispatch(
                                            selectLocation(
                                                location
                                            )
                                        );

                                        dispatch(
                                            fetchWeather({
                                                latitude:
                                                    location
                                                        .coordinates
                                                        .latitude,

                                                longitude:
                                                    location
                                                        .coordinates
                                                        .longitude,
                                            })
                                        );
                                    }}
                                >
                                    <span className="location-name">
                                        {location.name}, 
                                    </span>
                                    &nbsp;
                                    <span className="location-country">
                                        {location.country}
                                    </span>
                                </button>
                            )
                        )}

                    </div>

                </section>
            )}


            {/* =========================
                Dashboard
            ========================== */}

            {(selected ||
                weather ||
                weatherLoading ||
                weatherError) && (

                <main className="dashboard">

                    {/* =========================
                        Selected Location
                    ========================== */}

                    {selected && (
                        <section className="card location-card">

                            <div className="card-header">
                                <span className="card-label">
                                    LOCATION
                                </span>

                                <span className="location-icon">
                                    📍
                                </span>
                            </div>

                            <div className="location-main">

                                <h2 className="selected-location">
                                    {selected.name}
                                </h2>

                                <p className="selected-country">
                                    {selected.country}
                                </p>

                            </div>


                            <div className="coordinates">

                                <div className="coordinate-item">

                                    <span className="coordinate-label">
                                        Latitude:
                                    </span>

                                    <span className="coordinate-value">
                                        {
                                            selected
                                                .coordinates
                                                .latitude
                                        }
                                    </span>

                                </div>


                                <div className="coordinate-item">

                                    <span className="coordinate-label">
                                        Longitude:
                                    </span>

                                    <span className="coordinate-value">
                                        {
                                            selected
                                                .coordinates
                                                .longitude
                                        }
                                    </span>

                                </div>

                            </div>

                        </section>
                    )}


                    {/* =========================
                        Weather
                    ========================== */}

                    <section className="card weather-card">

                        <div className="card-header">

                            <span className="card-label">
                                CURRENT WEATHER
                            </span>

                            <span className="weather-icon">
                                🌤️
                            </span>

                        </div>


                        {weatherLoading && (
                            <div className="weather-loading">
                                <span className="loading-spinner"></span>

                                <span>
                                    Loading weather...
                                </span>
                            </div>
                        )}


                        {weatherError && (
                            <p className="error-message">
                                {weatherError}
                            </p>
                        )}


                        {weather && (
                            <>

                                <div className="weather-main">

                                    <div className="temperature-container">

                                        <span className="temperature">
                                            {
                                                weather
                                                    .current
                                                    .temperature
                                            }
                                        </span>

                                        <span className="temperature-unit">
                                            °C
                                        </span>

                                    </div>

                                    <span className="weather-code">
                                        Code{" "}
                                        {
                                            weather
                                                .current
                                                .weatherCode
                                        }
                                    </span>

                                </div>


                                <div className="weather-details">

                                    <div className="weather-detail">

                                        <span className="detail-label">
                                            💨 Wind Speed:
                                        </span>

                                        <span className="detail-value">
                                            {
                                                weather
                                                    .current
                                                    .windSpeed
                                            }{" "}
                                            km/hr
                                        </span>

                                    </div>


                                    <div className="weather-detail">

                                        <span className="detail-label">
                                            🌍 Timezone:
                                        </span>

                                        <span className="detail-value">
                                            {
                                                weather
                                                    .timezone
                                            }
                                        </span>

                                    </div>


                                    <div className="weather-detail">

                                        <span className="detail-label">
                                            🌡️ Temperature:
                                        </span>

                                        <span className="detail-value">
                                            {
                                                weather
                                                    .current
                                                    .temperature
                                            }
                                            °C
                                        </span>

                                    </div>


                                    <div className="weather-detail">

                                        <span className="detail-label">
                                            ☁️ Weather Code:
                                        </span>

                                        <span className="detail-value">
                                            {
                                                weather
                                                    .current
                                                    .weatherCode
                                            }
                                        </span>

                                    </div>

                                </div>

                            </>
                        )}

                    </section>

                </main>
            )}

        </div>
    )
}