import { FetchCallback } from '../../types';
import AppLoader from './appLoader';

class AppController extends AppLoader {
    public getSources<T>(callback: FetchCallback<T>): void {
        super.getResp<T>(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    public getNews<T>(e: MouseEvent, callback: FetchCallback<T>): void {
        let target: EventTarget | null = e.target;
        const newsContainer: EventTarget | null = e.currentTarget;

        while (target !== newsContainer) {
            if (target && target instanceof HTMLElement && newsContainer && newsContainer instanceof HTMLElement) {
                if (target.classList.contains('source__item')) {
                    const sourceId: string | null = target.getAttribute('data-source-id');

                    if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                        newsContainer.setAttribute('data-source', sourceId);

                        super.getResp<T>(
                            {
                                endpoint: 'everything',
                                options: {
                                    sources: sourceId,
                                },
                            },
                            callback
                        );
                    }

                    return;
                }

                target = target.parentNode;
            }
        }
    }
}

export default AppController;
