import './style.css';
import { classNames } from '../class-names';
import { BaseComponent } from '../../base-component/base-component';
import { LevelNode } from '../../../levels/level-node/level-node';
import { Store } from '../../../store';
import { LevelNodeAttributes } from '../../../types';

export class Card extends BaseComponent {
  private attributes: {
    classNames: string[];
    id: string | null;
  } = { classNames: [], id: null };

  constructor(node: LevelNode, parent: BaseComponent, private readonly cards: BaseComponent[], index: number) {
    super({ tagName: node.tagName, classNames: node.classNames.concat([classNames.customTag]), parent });

    this.setNodeData(node, index);
    this.attachListeners();
  }

  private getSelector(element: BaseComponent): string {
    return (
      element.tagName +
      element.getNodeClassName() +
      (element.getAttribute('id') ? '#' + element.getAttribute('id') : '') +
      (element.getAttribute('data-index') ? `[data-index="${element.getAttribute('data-index')}"]` : '')
    );
  }

  private removeHoverClass(): void {
    this.cards.forEach((card) => card.removeClass(classNames.cardHovered));
  }

  private handleMouseOver(event: Event): void {
    event.stopPropagation();
    this.removeHoverClass();
    this.addClass(classNames.cardHovered);

    let current = this.parentElement;

    let selector = this.getSelector(this);

    while (current) {
      if (current.hasClass(classNames.cardsWrapper)) {
        break;
      }

      selector += ` ${this.getSelector(current)}`;

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
  }

  private handleMouseLeave(): void {
    this.removeHoverClass();
    Store.htmlViewer.htmlViewerMarkup.node.dispatchEvent(new CustomEvent('mouse-out'));
  }

  private attachListeners(): void {
    this.addEventListener('mouseover', (event: Event) => this.handleMouseOver(event));
    this.addEventListener('mouseleave', () => this.handleMouseLeave());
  }

  private setNodeData(node: LevelNode, index: number): void {
    this.setNodeAttributes(node.classNames, node.id);
    this.setAttribute('data-index', index.toString());
    this.setDataHtmlValue(node);
  }

  private setDataHtmlValue(node: LevelNode): void {
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
        if (className === LevelNodeAttributes.TargetClass) return;

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
