import './style.css';
import classNames from '../../../classNames';
import { BaseComponent } from '../../base-component/base-component';
import { LevelNode } from '../../../levels/level-node/level-node';
import { LESSON_TARGET_CLASS } from '../../../constants';
import { Store } from '../../../store';

export class TableElement extends BaseComponent {
  private attributes: {
    classNames: string[];
    id: string | null;
  } = { classNames: [], id: null };

  constructor(
    node: LevelNode,
    parent: BaseComponent,
    private tableElements: BaseComponent[],
    private readonly index: number
  ) {
    super({ tagName: node.tagName, classNames: node.classNames.concat([classNames.table.element.ct]), parent });

    this.setNodeAttributes(node.classNames, node.id);
    this.setAttribute('data-index', index.toString());
    this.setDataHtmlValue(node);
    this.setHoverHandler();
  }

  public setDataHtmlValue(node: LevelNode): void {
    const id = this.attributes.id ? ` id="${this.attributes.id}"` : '';

    const classNames = this.attributes.classNames.length ? ` class="${this.attributes.classNames.join(' ')}"` : '';

    let dataValue = '';

    if (node.children) {
      dataValue += `<${node.tagName}${classNames + id}></${node.tagName}>`;
    } else {
      dataValue += `<${node.tagName}${classNames + id} />`;
    }

    this.setAttribute('data-html', dataValue);
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

  private setHoverHandler(): void {
    this.addEventListener('mouseover', (event: Event) => {
      event.stopPropagation();

      this.tableElements.forEach((el) => el.removeClass('hovered'));

      this.addClass('hovered');

      let current = this.parentElement;

      let selector =
        this.tagName +
        this.getNodeClassName() +
        (this.getAttribute('id') ? '#' + this.getAttribute('id') : '') +
        (this.getAttribute('data-index') ? `[data-index="${this.getAttribute('data-index')}"]` : '');

      while (current) {
        if (current.hasClass('table')) {
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

      Store.htmlViewer.htmlViewerMarkup.node.dispatchEvent(
        new CustomEvent('mouse-in', {
          detail: {
            selector: selector,
          },
        })
      );
    });

    this.addEventListener('mouseleave', () => {
      this.tableElements.forEach((el) => el.removeClass('hovered'));
      Store.htmlViewer.htmlViewerMarkup.node.dispatchEvent(new CustomEvent('mouse-out'));
    });
  }
}
