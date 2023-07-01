import './style.css';
import classNames from '../../../../classNames';
import { BaseComponent } from '../../../baseComponent/BaseComponent';
import { LessonNode } from '../../../../data/LessonNode';
import { LESSON_TARGET_CLASS } from '../../../../constants';
import { Store } from '../../../../store/Store';

export class HtmlViewerMarkupElement extends BaseComponent {
  private attributes: string[] = [];

  constructor(
    node: LessonNode,
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

  public insertText(node: LessonNode): void {
    const nodeAttributes = this.attributes.length ? ' ' + this.attributes.join(' ') : '';

    if (node.children) {
      this.insertTextNodes([
        ['afterbegin', `<${node.tagName}${nodeAttributes}>`],
        ['beforeend', `</${node.tagName}>`],
      ]);
    } else {
      this.insertTextNodes([['afterbegin', `<${node.tagName}${nodeAttributes} />`]]);
    }
  }

  private setNodeAttributes(classNames: string[] | null, id: string | null): void {
    if (classNames) {
      classNames.forEach((className) => {
        if (className === LESSON_TARGET_CLASS) return;

        this.addClass(className);
        this.attributes.push(`class="${className}"`);
      });
    }

    if (id) {
      this.setAttribute('id', id);
      this.attributes.push(`id="${id}"`);
    }
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

      console.log(selector);

      Store.cardsTable.node.dispatchEvent(
        new CustomEvent('mouse-in', {
          detail: {
            selector: selector,
          },
        })
      );
    });

    this.addEventListener('mouseleave', () => {
      this.htmlViewerElements.forEach((el) => el.removeClass(classNames.htmlViewer.activeElement));
      Store.cardsTable.node.dispatchEvent(new CustomEvent('mouse-out'));
    });
  }
}
