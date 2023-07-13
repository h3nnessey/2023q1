import './style.css';
import { classNames } from './class-names';
import { BaseComponent } from '../base-component/base-component';
import { LINE_NUMBERS_COUNT } from '../../constants';

export class LineNumbers extends BaseComponent {
  constructor(parent: BaseComponent, count = LINE_NUMBERS_COUNT) {
    super({ tagName: 'ul', classNames: [classNames.lineNumbers], parent });

    for (let i = 0; i < count; i += 1) {
      const li = new BaseComponent({ tagName: 'li', classNames: [classNames.lineNumbersItem], parent: this });
      li.insertTextNodes([['afterbegin', `${i + 1}`]]);
    }
  }
}
