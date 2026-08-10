export interface Coordinates {
    latitude: number;
    longitude: number;
}

export interface Location {
    name: string;
    country: string;
    coordinates: Coordinates;
}

export interface LocationState {
    results: Location[];
    selected: Location | null;
    loading: boolean;
    error: string | null;
}
