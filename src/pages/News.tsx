import { useAppSelector, useAppDispatch } from "../app/hooks"
import { fetchNews } from "../features/news/newsSlice";
import { useEffect } from "react";
import "./News.css";

export function News() {
    const { articles, loading, error } = useAppSelector((state) => state.news);
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(fetchNews())
    }, [dispatch])

    // Format ISO date or string date to readable format
    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch {
            return dateString;
        }
    }

    return (
        <div className="news-container">
            <header className="news-header">
                <h1 className="news-page-title">Latest Updates</h1>
                <p className="news-subtitle">
                    Stay informed with the latest headlines and breaking news.
                </p>
            </header>

            {loading && (
                <div className="news-loading">
                    <span className="loading-spinner"></span>
                    <span>Fetching news articles...</span>
                </div>
            )}

            {error && (
                <div className="news-error-message">
                    <span>⚠️ {error}</span>
                </div>
            )}
  
            {!loading && !error && articles.length === 0 && (
                <div className="news-empty-state">
                    <p>No news articles available at the moment. Please check back later.</p>
                </div>
            )}

            {!loading && !error && articles.length > 0 && (
                <div className="news-grid">
                    {articles.map((article) => (
                        <article className="news-card" key={article.url}>
                            <div className="news-card-image-wrapper">
                                {article.imageUrl ? (
                                    <img 
                                        className="news-card-image" 
                                        src={article.imageUrl} 
                                        alt={article.title} 
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="news-card-image-fallback">
                                        📰
                                    </div>
                                )}
                                <span className="news-source-badge">
                                    {article.source || "News"}
                                </span>
                            </div>

                            <div className="news-card-content">
                                <h2 className="news-title" title={article.title}>
                                    {article.title}
                                </h2>
                                <p className="news-description">
                                    {article.description 
                                        ? article.description.replace(/<[^>]*>/g, '').trim() 
                                        : "No description available."}
                                </p>
                                <div className="news-card-footer">
                                    <span className="news-published-date">
                                        🗓️ {formatDate(article.publishedAt)}
                                    </span>
                                    <a 
                                        className="news-read-more" 
                                        href={article.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                    >
                                        Read Article <span className="arrow">→</span>
                                    </a>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    )
}