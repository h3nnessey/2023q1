import './style.css';
import { classNames } from '../class-names';
import { BaseComponent } from '../../base-component/base-component';
import { LevelNode } from '../../../levels/level-node/level-node';
import { Store } from '../../../store';
import { CUSTOM_EVENTS } from '../../../constants';

export class Card extends BaseComponent {
  constructor(node: LevelNode, parent: BaseComponent, private readonly cards: BaseComponent[], index: number) {
    super({ tagName: node.tagName, classNames: node.classNames.concat([classNames.customTag]), parent });

    this.setNodeData(node, index);
    this.attachListeners();
  }

  private removeHoverClass(): void {
    this.cards.forEach((card) => card.removeClass(classNames.cardHovered));
  }

  private handleMouseOver(event: Event): void {
    event.stopPropagation();
    this.removeHoverClass();
    this.addClass(classNames.cardHovered);

    Store.htmlViewer.htmlViewerMarkup.node.dispatchEvent(
      new CustomEvent(CUSTOM_EVENTS.MOUSE_IN, {
        detail: {
          selector: this.getSelector(classNames.cardsWrapper),
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
    this.setAttribute('data-index', index.toString());
    node.id && this.setAttribute('id', node.id);
    this.setDataHtmlValue(node);
  }

  private setDataHtmlValue(node: LevelNode): void {
    const id = this.getAttribute('id') ? ` id="${this.getAttribute('id')}"` : '';

    const classNames = this.classNames.length ? ` class="${this.getNodeClassName().replace('.', '')}"` : '';

    let dataValue = '';

    if (node.children) {
      dataValue += `<${node.tagName}${classNames + id}></${node.tagName}>`;
    } else {
      dataValue += `<${node.tagName}${classNames + id} />`;
    }

    this.setAttribute('data-html', dataValue);
  }
}
