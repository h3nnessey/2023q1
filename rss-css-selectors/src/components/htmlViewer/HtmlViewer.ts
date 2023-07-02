import './style.css';
import classNames from '../../classNames';
import { BaseComponent } from '../baseComponent/BaseComponent';
import { HtmlViewerMarkup } from './htmlViewerMarkup/HtmlViewerMarkup';
import { LineNumbers } from '../lineNumbers/LineNumbers';

export class HtmlViewer extends BaseComponent {
  private readonly lineNumbers: LineNumbers;
  private readonly htmlViewerHeader: BaseComponent;
  private readonly htmlViewerRow: BaseComponent;
  public readonly htmlViewerMarkup: HtmlViewerMarkup;

  constructor(parent: BaseComponent) {
    super({ classNames: [classNames.htmlViewer.root], parent });

    this.htmlViewerHeader = new BaseComponent({
      tagName: 'p',
      classNames: ['html-viewer__header'],
      parent: this,
      html: '<span>HTML Viewer</span><span>cards.html</span>',
    });

    this.htmlViewerRow = new BaseComponent({ classNames: ['html-viewer__row'], parent: this });

    this.lineNumbers = new LineNumbers(this.htmlViewerRow);
    this.htmlViewerMarkup = new HtmlViewerMarkup(this.htmlViewerRow);
  }

  public render(): void {
    this.htmlViewerMarkup.render();
  }
}
