import './sources.css';
import { NewsSource } from '../../../types';
import { getHtmlElement } from '../../../utils';

class Sources {
    public draw(data: NewsSource[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement = getHtmlElement<HTMLTemplateElement>('#sourceItemTemp');

        data.forEach((item: NewsSource): void => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as typeof sourceItemTemp.content;
            const sourceName: HTMLSpanElement = getHtmlElement<HTMLSpanElement>('.source__item-name', sourceClone);
            const sourceItem: HTMLDivElement = getHtmlElement<HTMLDivElement>('.source__item', sourceClone);

            sourceName.textContent = item.name;
            sourceItem.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        const sources: HTMLDivElement = getHtmlElement<HTMLDivElement>('.sources');
        const toggleSourcesBtn: HTMLButtonElement = getHtmlElement<HTMLButtonElement>('.sources-toggle-btn');

        sources.append(fragment);

        toggleSourcesBtn.addEventListener('click', (): void => {
            sources.classList.toggle('sources_hidden');
            toggleSourcesBtn.classList.toggle('active');
        });
    }
}

export default Sources;
