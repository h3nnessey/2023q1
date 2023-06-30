import './style.css';
import classNames from '../../classNames';
import { BaseComponent } from '../baseComponent/BaseComponent';
import { LINE_NUMBERS_COUNT } from '../../constants';

export class LineNumbers extends BaseComponent {
  constructor(parent: BaseComponent) {
    super({ tagName: 'ul', classNames: [classNames.lineNumbers.root], parent });
    for (let i = 0; i < LINE_NUMBERS_COUNT; i += 1) {
      const li = new BaseComponent({ tagName: 'li', classNames: [classNames.lineNumbers.element], parent: this });
      li.insertTextNodes([['afterbegin', `${i + 1}`]]);
    }
  }
}
