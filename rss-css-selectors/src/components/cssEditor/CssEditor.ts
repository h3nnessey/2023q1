import './style.css';
import { BaseComponent } from '../baseComponent/BaseComponent';
import { LineNumbers } from '../lineNumbers/LineNumbers';
import { HtmlViewer } from '../htmlViewer/HtmlViewer';
import { CssEditorInputs } from './cssEditorInputs/CssEditorInputs';

export class CssEditor extends BaseComponent {
  private readonly lineNumbers: LineNumbers;
  private readonly cssEditorInputs: CssEditorInputs;

  constructor(private readonly lessonAnswer: string, private readonly htmlViewer: HtmlViewer, parent: BaseComponent) {
    super({ classNames: ['css-editor'], parent });

    this.lineNumbers = new LineNumbers(this);
    this.cssEditorInputs = new CssEditorInputs(this.htmlViewer, this.lessonAnswer, this);
    this.htmlViewer = htmlViewer;
  }

  public render() {}
}
