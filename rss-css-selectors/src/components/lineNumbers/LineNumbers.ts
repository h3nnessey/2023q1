import './style.css';
import { BaseComponent } from '../baseComponent/BaseComponent';

export class LineNumbers extends BaseComponent {
  constructor(parent: BaseComponent) {
    super({ tagName: 'ul', classNames: ['line-numbers'], parent });
  }

  public render(): void {
    for (let i = 0; i < 20; i += 1) {
      const li = new BaseComponent({ tagName: 'li', classNames: ['line-numbers__item'], parent: this });
      li.insertTextNodes([['afterbegin', `${i + 1}`]]);
    }
  }
}
