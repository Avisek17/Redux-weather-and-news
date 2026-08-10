import { useAppSelector, useAppDispatch } from "../app/hooks"
import { fetchNews } from "../features/news/newsSlice";
import { useEffect } from "react";
export function News() {
    const {articles, loading, error} = useAppSelector((state)=> state.news);
    const dispatch = useAppDispatch();
    
    useEffect(()=>{
        dispatch(fetchNews())
    },[dispatch])
    return(
        <div>
            <h1>News</h1>
                {loading && (
                    <p>
                        Loading News...
                    </p>
                )}

                {error && (
                        <p>{error}</p>
                    )
                }
      
                {!loading && !error && articles.length === 0 &&(
                    <p>
                        No news Available
                    </p>
                )}

                {articles.length > 0 && (
                    <div>
                        {articles.map(
                            (article) => (
                                <article
                                key={article.url}>
                                    <h2>
                                        {article.title}
                                    </h2>
                                    <p> 
                                        {article.description}
                                    </p>
                                    <p>
                                        {article.source}
                                    </p>
                                    <a href={article.url}
                                    target="_blank"
                                    rel="norederrer">
                                        Read Article
                                    </a>
                                </article>
                            )
                        )}
                    </div>
                )}
        </div>
    )
}