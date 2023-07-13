import './style.css';
import classNames from '../../../../classNames';
import { BaseComponent } from '../../../base-component/base-component';
import { LevelNode } from '../../../../levels/level-node/level-node';
import { LESSON_TARGET_CLASS } from '../../../../constants';
import { Store } from '../../../../store';

export class HtmlViewerMarkupElement extends BaseComponent {
  private attributes: {
    classNames: string[];
    id: string | null;
  } = { classNames: [], id: null };

  constructor(
    node: LevelNode,
    parent: BaseComponent,
    private readonly htmlViewerElements: BaseComponent[],
    private readonly index: number
  ) {
    super({
      tagName: node.tagName,
      classNames: node.classNames
        .filter((className) => className !== LESSON_TARGET_CLASS)
        .concat(Object.values(classNames.htmlViewer.element)),
      parent,
    });

    this.setNodeAttributes(node.classNames, node.id);
    this.setAttribute('data-index', index.toString());
    this.setHoverHandler();
  }

  private setHoverHandler(): void {
    this.addEventListener('mouseover', (event: Event) => {
      event.stopPropagation();

      this.htmlViewerElements.forEach((el) => el.removeClass(classNames.htmlViewer.activeElement));

      this.addClass(classNames.htmlViewer.activeElement);

      let current = this.parentElement;

      let selector =
        this.tagName +
        this.getNodeClassName() +
        (this.getAttribute('id') ? '#' + this.getAttribute('id') : '') +
        (this.getAttribute('data-index') ? `[data-index="${this.getAttribute('data-index')}"]` : '');

      while (current) {
        if (current.hasClass(classNames.htmlViewer.markup)) {
          break;
        }

        selector +=
          ' ' +
          current.tagName +
          (current.getAttribute('id') ? '#' + current.getAttribute('id') : '') +
          (current.getAttribute('data-index') ? `[data-index="${current.getAttribute('data-index')}"]` : '');

        current = current.parentElement;
      }

      selector = selector.split(' ').reverse().join(' ');

      Store.cards.node.dispatchEvent(
        new CustomEvent('mouse-in', {
          detail: {
            selector: selector,
          },
        })
      );
    });

    this.addEventListener('mouseleave', () => {
      this.htmlViewerElements.forEach((el) => el.removeClass(classNames.htmlViewer.activeElement));
      Store.cards.node.dispatchEvent(new CustomEvent('mouse-out'));
    });
  }

  public insertText(node: LevelNode): void {
    const id = this.attributes.id
      ? `<span class="tag-attr"> id</span><span class="tag-attr-value">="${this.attributes.id}"</span>`
      : '';

    const classNames = this.attributes.classNames.length
      ? `<span class="tag-attr"> class</span><span class="tag-attr-value">="${this.attributes.classNames.join(
          ' '
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

  private setNodeAttributes(classNames: string[] | null, id: string | null): void {
    if (classNames) {
      classNames.forEach((className) => {
        if (className === LESSON_TARGET_CLASS) return;

        this.addClass(className);
        this.attributes.classNames.push(className);
      });
    }

    if (id) {
      this.setAttribute('id', id);
      this.attributes.id = id;
    }
  }
}
