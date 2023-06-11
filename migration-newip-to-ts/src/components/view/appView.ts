import News from './news/news';
import Sources from './sources/sources';
import { NewsArticle, NewsArticlesResponse, NewsSource, NewsSourcesResponse } from '../../types';

export class AppView {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: NewsArticlesResponse) {
        const values: NewsArticle[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: NewsSourcesResponse) {
        const values: NewsSource[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
