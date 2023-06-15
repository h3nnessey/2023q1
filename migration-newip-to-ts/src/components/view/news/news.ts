import './news.css';
import placeholderImg from '../../../img/placeholder.png';
import { NewsArticle } from '../../../types';
import { getHtmlElement } from '../../../utils';

class News {
    public draw(data: NewsArticle[]): void {
        const news: NewsArticle[] =
            data.length >= 10 ? data.filter((_item: NewsArticle, idx: number): boolean => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement = getHtmlElement<HTMLTemplateElement>('#newsItemTemp');

        news.forEach((item: NewsArticle, idx: number): void => {
            const newsClone = newsItemTemp.content.cloneNode(true) as typeof newsItemTemp.content;

            if (idx % 2) {
                const newsItem: HTMLDivElement = getHtmlElement<HTMLDivElement>('.news__item', newsClone);
                newsItem.classList.add('alt');
            }

            const newsPhoto: HTMLDivElement = getHtmlElement<HTMLDivElement>('.news__meta-photo', newsClone);
            const newsAuthor: HTMLUListElement = getHtmlElement<HTMLUListElement>('.news__meta-author', newsClone);
            const newsDate: HTMLUListElement = getHtmlElement<HTMLUListElement>('.news__meta-date', newsClone);
            const newsTitle: HTMLHeadingElement = getHtmlElement<HTMLHeadingElement>(
                '.news__description-title',
                newsClone
            );
            const newsDescription: HTMLHeadingElement = getHtmlElement<HTMLHeadingElement>(
                '.news__description-source',
                newsClone
            );
            const newsDescriptionContent: HTMLParagraphElement = getHtmlElement<HTMLParagraphElement>(
                '.news__description-content',
                newsClone
            );
            const newsLink: HTMLLinkElement = getHtmlElement<HTMLLinkElement>('.news__read-more a', newsClone);

            newsPhoto.style.backgroundImage = `url(${item.urlToImage || placeholderImg})`;
            newsAuthor.textContent = item.author || item.source.name;
            newsDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
            newsTitle.textContent = item.title;
            newsDescription.textContent = item.source.name;
            newsDescriptionContent.textContent = item.description;
            newsLink.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsElement: HTMLDivElement = getHtmlElement<HTMLDivElement>('.news');

        newsElement.innerHTML = '';
        newsElement.appendChild(fragment);
    }
}

export default News;
