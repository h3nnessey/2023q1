import './style.css';
import classNames from '../../classNames';
import { BaseComponent } from '../baseComponent/BaseComponent';
import { LineNumbers } from '../lineNumbers/LineNumbers';
import { CssEditorInputs } from './cssEditorInputs/CssEditorInputs';

export class CssEditor extends BaseComponent {
  private readonly lineNumbers: LineNumbers;
  private readonly cssEditorInputs: CssEditorInputs;
  private readonly cssEditorHeader: BaseComponent;
  private readonly cssEditorRow: BaseComponent;

  constructor(parent: BaseComponent) {
    super({ classNames: [classNames.cssEditor.root], parent });

    this.cssEditorHeader = new BaseComponent({
      tagName: 'p',
      classNames: ['css-editor__header'],
      parent: this,
      html: '<span>CSS Editor</span><span>style.css</span>',
    });

    this.cssEditorRow = new BaseComponent({ classNames: ['css-editor__row'], parent: this });

    this.lineNumbers = new LineNumbers(this.cssEditorRow, 1);
    this.cssEditorInputs = new CssEditorInputs(this.cssEditorRow);
  }

  public render() {}
}
