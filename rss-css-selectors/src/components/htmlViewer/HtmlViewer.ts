import './style.css';
import { BaseComponent } from '../baseComponent/BaseComponent';
import { HtmlViewerMarkup } from './htmlViewerMarkup/HtmlViewerMarkup';
import { LessonNode } from '../../data/LessonNode';
import { LineNumbers } from '../lineNumbers/LineNumbers';

export class HtmlViewer extends BaseComponent {
  private readonly lineNumbers: LineNumbers;
  private readonly htmlViewerMarkup: HtmlViewerMarkup;

  constructor(private nodes: LessonNode[], parent: BaseComponent) {
    super({ classNames: ['html-viewer'], parent });

    this.lineNumbers = new LineNumbers(this);
    this.htmlViewerMarkup = new HtmlViewerMarkup(nodes, this);
  }

  public render(): void {
    this.htmlViewerMarkup.render(this.nodes);
  }

  public rerender(nodes: LessonNode[]): void {
    this.nodes = nodes;
    this.htmlViewerMarkup.render(this.nodes);
  }
}
