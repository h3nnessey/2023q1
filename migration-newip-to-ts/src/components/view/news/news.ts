import './news.css';
import { NewsArticle } from '../../../types';

class News {
    public draw(data: NewsArticle[]): void {
        const news: NewsArticle[] =
            data.length >= 10 ? data.filter((_item: NewsArticle, idx: number): boolean => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

        news.forEach((item: NewsArticle, idx: number): void => {
            if (newsItemTemp) {
                const newsClone = newsItemTemp.content.cloneNode(true) as typeof newsItemTemp;

                if (idx % 2) {
                    const newsItem: HTMLDivElement | null = newsClone.querySelector<HTMLDivElement>('.news__item');
                    newsItem?.classList.add('alt');
                }

                const newsPhoto: HTMLDivElement | null = newsClone.querySelector<HTMLDivElement>('.news__meta-photo');
                const newsAuthor: HTMLUListElement | null = newsClone.querySelector<HTMLUListElement>(
                    '.news__meta-author'
                );
                const newsDate: HTMLUListElement | null = newsClone.querySelector<HTMLUListElement>('.news__meta-date');
                const newsTitle: HTMLHeadingElement | null = newsClone.querySelector<HTMLHeadingElement>(
                    '.news__description-title'
                );
                const newsDescription: HTMLHeadingElement | null = newsClone.querySelector<HTMLHeadingElement>(
                    '.news__description-source'
                );
                const newsDescriptionContent: HTMLParagraphElement | null = newsClone.querySelector<HTMLParagraphElement>(
                    '.news__description-content'
                );
                const newsLink: HTMLLinkElement | null = newsClone.querySelector<HTMLLinkElement>('.news__read-more a');

                newsPhoto &&
                    (newsPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`);
                newsAuthor && (newsAuthor.textContent = item.author || item.source.name);
                newsDate && (newsDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-'));
                newsTitle && (newsTitle.textContent = item.title);
                newsDescription && (newsDescription.textContent = item.source.name);
                newsDescriptionContent && (newsDescriptionContent.textContent = item.description);
                newsLink?.setAttribute('href', item.url);

                fragment.append(newsClone);
            }
        });

        const newsElement: HTMLDivElement | null = document.querySelector<HTMLDivElement>('.news');

        if (newsElement) {
            newsElement.innerHTML = '';
            newsElement.appendChild(fragment);
        }
    }
}

export default News;
