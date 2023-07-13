import './style.css';
import { classNames } from './class-names';
import { BaseComponent } from '../base-component/base-component';
import { Markup } from './markup/markup';
import { LineNumbers } from '../line-numbers/line-numbers';

export class HtmlViewer extends BaseComponent {
  private readonly lineNumbers: LineNumbers;
  private readonly htmlViewerHeader: BaseComponent;
  private readonly htmlViewerRow: BaseComponent;
  public readonly htmlViewerMarkup: Markup;

  constructor() {
    super({ classNames: [classNames.htmlViewer] });

    this.htmlViewerHeader = new BaseComponent({
      tagName: 'p',
      classNames: [classNames.header],
      parent: this,
      html: '<span>HTML Viewer</span><span>cards.html</span>',
    });

    this.htmlViewerRow = new BaseComponent({ classNames: [classNames.row], parent: this });

    this.lineNumbers = new LineNumbers(this.htmlViewerRow);
    this.htmlViewerMarkup = new Markup(this.htmlViewerRow);
  }

  public render(): void {
    this.htmlViewerMarkup.render();
  }
}
