import './sources.css';
import { NewsSource } from '../../../types';

class Sources {
    draw(data: NewsSource[]) {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector<HTMLTemplateElement>(
            '#sourceItemTemp'
        );

        data.forEach((item) => {
            if (sourceItemTemp) {
                const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;
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
        sources?.append(fragment);
    }
}

export default Sources;
