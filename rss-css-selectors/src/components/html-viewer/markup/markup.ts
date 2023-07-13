import './style.css';
import { classNames } from '../class-names';
import { LevelNode } from '../../../levels/level-node/level-node';
import { BaseComponent } from '../../base-component/base-component';
import { MarkupElement } from './markup-element/markup-element';
import { Store } from '../../../store';
import { CUSTOM_EVENTS } from '../../../constants';

export class Markup extends BaseComponent {
  private elements: BaseComponent[] = [];

  constructor(parent: BaseComponent) {
    super({
      classNames: [classNames.markup],
      parent,
    });

    this.attachListeners();
  }

  private attachListeners(): void {
    this.node.addEventListener(CUSTOM_EVENTS.MOUSE_IN, (event: Event) => {
      if (event instanceof CustomEvent) {
        this.removeActiveClass();
        this.node.querySelector(event.detail.selector)?.classList.add(classNames.active);
      }
    });

    this.node.addEventListener(CUSTOM_EVENTS.MOUSE_OUT, () => this.removeActiveClass());
  }

  private removeActiveClass(): void {
    this.elements.forEach((element) => element.removeClass(classNames.active));
  }

  private createMarkup(nodeList: LevelNode[], parent: BaseComponent): void {
    const nodes: BaseComponent[] = [];

    nodeList.forEach((node: LevelNode, index) => {
      const htmlViewerItem = new MarkupElement(node, parent, this.elements, index);

      if (node.children) {
        this.createMarkup(node.children, htmlViewerItem);
      }

      htmlViewerItem.insertText(node);
      nodes.push(htmlViewerItem);
      this.elements.push(htmlViewerItem);
    });

    parent.append(nodes);
  }

  public render(): void {
    this.elements.forEach((element) => element.delete());
    this.elements = [];
    this.node.innerHTML = '';
    this.createMarkup(Store.currentLevelNodes, this);
  }
}
