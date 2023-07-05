import './style.css';
import classNames from '../../../classNames';
import { LessonNode } from '../../../data/LessonNode';
import { BaseComponent } from '../../baseComponent/BaseComponent';
import { HtmlViewerMarkupElement } from './htmlViewerMarkupElement/HtmlViewerMarkupElement';
import { Store } from '../../../store/Store';

export class HtmlViewerMarkup extends BaseComponent {
  private elements: BaseComponent[] = [];

  constructor(parent: BaseComponent) {
    super({
      classNames: [classNames.htmlViewer.markup],
      parent,
    });

    this.node.addEventListener('mouse-in', (event: Event) => {
      if (event instanceof CustomEvent) {
        this.elements.forEach((element) => element.removeClass('active'));
        this.node.querySelector(event.detail.selector)?.classList.add('active');
      }
    });

    this.node.addEventListener('mouse-out', (event: Event) => {
      if (event instanceof CustomEvent) {
        this.elements.forEach((element) => element.removeClass('active'));
      }
    });
  }

  private createHtmlViewerDom(nodeList: LessonNode[], parent: BaseComponent): void {
    const nodes: BaseComponent[] = [];

    nodeList.forEach((node: LessonNode, index) => {
      const htmlViewerItem = new HtmlViewerMarkupElement(node, parent, this.elements, index);

      if (node.children) {
        this.createHtmlViewerDom(node.children, htmlViewerItem);
      }

      htmlViewerItem.insertText(node);
      nodes.push(htmlViewerItem);
      this.elements.push(htmlViewerItem);
    });

    parent.append(nodes);
  }

  public render(): void {
    this.node.innerHTML = '';
    this.elements.forEach((element) => element.delete());
    this.createHtmlViewerDom(Store.currentLessonNodes, this);
  }
}
