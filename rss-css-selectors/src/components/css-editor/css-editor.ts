import './style.css';
import { classNames } from './class-names';
import { BaseComponent } from '../base-component/base-component';
import { LineNumbers } from '../line-numbers/line-numbers';
import { Controls } from './controls/controls';

export class CssEditor extends BaseComponent {
  private readonly lineNumbers: LineNumbers;
  private readonly controls: Controls;
  private readonly title: BaseComponent;
  private readonly row: BaseComponent;

  constructor() {
    super({ classNames: [classNames.cssEditor] });

    this.title = new BaseComponent({
      tagName: 'p',
      classNames: [classNames.title],
      parent: this,
      html: '<span>CSS Editor</span><span>style.css</span>',
    });

    this.row = new BaseComponent({ classNames: [classNames.row], parent: this });
    this.lineNumbers = new LineNumbers(this.row, 1);
    this.controls = new Controls(this.row);
  }

  public render() {
    this.controls.clear();
  }
}
