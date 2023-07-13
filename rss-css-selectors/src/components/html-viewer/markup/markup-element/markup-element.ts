import './style.css';
import { classNames } from '../../class-names';
import { CUSTOM_EVENTS } from '../../../../constants';
import { BaseComponent } from '../../../base-component/base-component';
import { LevelNode } from '../../../../levels/level-node/level-node';
import { LevelNodeAttributes } from '../../../../types';
import { Store } from '../../../../store';

export class MarkupElement extends BaseComponent {
  constructor(
    node: LevelNode,
    parent: BaseComponent,
    private readonly htmlViewerElements: BaseComponent[],
    private readonly index: number
  ) {
    super({
      tagName: node.tagName,
      classNames: node.classNames
        .filter((className) => className !== LevelNodeAttributes.TargetClass)
        .concat([classNames.pl20, classNames.customTag]),
      parent,
    });

    this.setElementData(node.id, index);
    this.attachListeners();
  }

  private setElementData(id: string | null, index: number): void {
    this.setAttribute('data-index', index.toString());
    id && this.setAttribute('id', id);
  }

  private attachListeners(): void {
    this.addEventListener('mouseover', (event: Event) => {
      event.stopPropagation();
      this.removeActiveClass();
      this.addClass(classNames.active);

      Store.cards.node.dispatchEvent(
        new CustomEvent(CUSTOM_EVENTS.MOUSE_IN, {
          detail: {
            selector: this.getSelector(classNames.markup),
          },
        })
      );
    });

    this.addEventListener('mouseleave', () => {
      this.removeActiveClass();
      Store.cards.node.dispatchEvent(new CustomEvent(CUSTOM_EVENTS.MOUSE_OUT));
    });
  }

  public insertText(node: LevelNode): void {
    const id = this.getAttribute('id')
      ? `<span class="tag-attr"> id</span><span class="tag-attr-value">="${this.getAttribute('id')}"</span>`
      : '';

    const classNames = this.classNames.length
      ? `<span class="tag-attr"> class</span><span class="tag-attr-value">="${this.getNodeClassName().replace(
          '.',
          ''
        )}"</span>`
      : '';

    if (node.children) {
      this.insertHtml([
        [
          'afterbegin',
          `<span class="tag-bracket">&lt;</span><span class="tag-name">${node.tagName}</span>${
            classNames + id
          }<span class="tag-bracket">&gt;</span>`,
        ],
        [
          'beforeend',
          `<span class="tag-bracket">&lt;/</span><span class="tag-name">${node.tagName}</span><span class="tag-bracket">&gt;</span>`,
        ],
      ]);
    } else {
      this.insertHtml([
        [
          'afterbegin',
          `<span class="tag-bracket">&lt;</span><span class="tag-name">${node.tagName}</span>${
            classNames + id
          }<span class="tag-bracket"> /&gt;</span>`,
        ],
      ]);
    }
  }

  private removeActiveClass(): void {
    this.htmlViewerElements.forEach((el) => el.removeClass(classNames.active));
  }
}
