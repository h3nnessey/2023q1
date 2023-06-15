import { NewsArticlesResponse, NewsSourcesResponse } from '../../types';
import AppController from '../controller/controller';
import AppView from '../view/appView';
import { getHtmlElement } from '../../utils';

class App {
    private readonly controller: AppController;
    private readonly view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const sources: HTMLDivElement = getHtmlElement<HTMLDivElement>('.sources');

        sources.addEventListener('click', (e: MouseEvent) =>
            this.controller.getNews<NewsArticlesResponse>(e, (data: NewsArticlesResponse) => this.view.drawNews(data))
        );

        this.controller.getSources<NewsSourcesResponse>((data: NewsSourcesResponse) => this.view.drawSources(data));
    }
}

export default App;
