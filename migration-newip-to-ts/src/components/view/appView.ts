import News from './news/news';
import Sources from './sources/sources';
import { NewsArticle, NewsArticlesResponse, NewsSource, NewsSourcesResponse } from '../../types';

class AppView {
    private readonly news: News;
    private readonly sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: NewsArticlesResponse): void {
        const values: NewsArticle[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    public drawSources(data: NewsSourcesResponse): void {
        const values: NewsSource[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
