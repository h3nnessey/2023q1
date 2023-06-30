import './style.css';
import classNames from '../../classNames';
import { BaseComponent } from '../baseComponent/BaseComponent';
import { LineNumbers } from '../lineNumbers/LineNumbers';
import { CssEditorInputs } from './cssEditorInputs/CssEditorInputs';

export class CssEditor extends BaseComponent {
  private readonly lineNumbers: LineNumbers;
  private readonly cssEditorInputs: CssEditorInputs;

  constructor(parent: BaseComponent) {
    super({ classNames: [classNames.cssEditor.root], parent });

    this.lineNumbers = new LineNumbers(this);
    this.cssEditorInputs = new CssEditorInputs(this);
  }

  public render() {}
}
