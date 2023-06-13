import './sources.css';
import { NewsSource } from '../../../types';

class Sources {
    public draw(data: NewsSource[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector<HTMLTemplateElement>(
            '#sourceItemTemp'
        );

        data.forEach((item: NewsSource): void => {
            if (sourceItemTemp) {
                const sourceClone = sourceItemTemp.content.cloneNode(true) as typeof sourceItemTemp;
                const sourceName: HTMLSpanElement | null = sourceClone.querySelector<HTMLSpanElement>(
                    '.source__item-name'
                );
                const sourceItem: HTMLDivElement | null = sourceClone.querySelector<HTMLDivElement>('.source__item');

                sourceName && (sourceName.textContent = item.name);
                sourceItem?.setAttribute('data-source-id', item.id);

                fragment.append(sourceClone);
            }
        });

        const sources: HTMLDivElement | null = document.querySelector<HTMLDivElement>('.sources');
        const toggleSourcesBtn: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>(
            '.sources-toggle-btn'
        );
        sources?.append(fragment);
        toggleSourcesBtn?.addEventListener('click', () => {
            sources?.classList.toggle('sources_hidden');
            toggleSourcesBtn?.classList.toggle('active');
        });
    }
}

export default Sources;
