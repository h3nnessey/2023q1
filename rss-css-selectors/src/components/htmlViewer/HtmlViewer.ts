import './style.css';
import classNames from '../../classNames';
import { BaseComponent } from '../baseComponent/BaseComponent';
import { HtmlViewerMarkup } from './htmlViewerMarkup/HtmlViewerMarkup';
import { LineNumbers } from '../lineNumbers/LineNumbers';

export class HtmlViewer extends BaseComponent {
  private readonly lineNumbers: LineNumbers;
  public readonly htmlViewerMarkup: HtmlViewerMarkup;

  constructor(parent: BaseComponent) {
    super({ classNames: [classNames.htmlViewer.root], parent });

    this.lineNumbers = new LineNumbers(this);
    this.htmlViewerMarkup = new HtmlViewerMarkup(this);
  }

  public render(): void {
    this.htmlViewerMarkup.render();
  }
}
