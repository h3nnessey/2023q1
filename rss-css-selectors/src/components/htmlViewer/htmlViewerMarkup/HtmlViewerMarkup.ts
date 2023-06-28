import './style.css';
import { LessonNode } from '../../../data/LessonNode';
import { BaseComponent } from '../../baseComponent/BaseComponent';
import { HtmlViewerMarkupElement } from './htmlViewerMarkupElement/HtmlViewerMarkupElement';

export class HtmlViewerMarkup extends BaseComponent {
  private elements: BaseComponent[] = [];
  constructor(private readonly nodes: LessonNode[], parent: BaseComponent) {
    super({
      classNames: ['html'],
      parent,
    });
  }

  private createHtmlViewerDom(nodeList: LessonNode[], parent: BaseComponent): void {
    const nodes: BaseComponent[] = [];

    nodeList.forEach((node: LessonNode) => {
      const htmlViewerItem = new HtmlViewerMarkupElement(node, parent, this.elements);

      if (node.children) {
        this.createHtmlViewerDom(node.children, htmlViewerItem);
      }

      htmlViewerItem.insertText(node);
      nodes.push(htmlViewerItem);
      this.elements.push(htmlViewerItem);
    });

    parent.append(nodes);
  }

  public render(nodes: LessonNode[]): void {
    this.node.innerHTML = '';
    this.elements.forEach((element) => element.delete());
    this.elements = [];

    this.createHtmlViewerDom(nodes, this);
    this.insertTextNodes([
      ['afterbegin', '<div class="html">'],
      ['beforeend', '</div>'],
    ]);
  }
}
