export interface NewsArticle {
    title: string;
    description: string | null;
    url: string;
    imageUrl: string | null;
    publishedAt: string;
    source: string;
}

export interface NewsState{
    articles: NewsArticle[];
    loading: boolean;
    error: string  | null;
}

export interface RSS2JSONItem {
    title: string;
    description: string;
    link: string;
    pubDate: string;
    thumbnail: string;
}
export interface RSS2JSONResponse {
    status: string;

    feed: {
        title: string;
        link: string;
        description: string;
    };

    items: RSS2JSONItem[];
}