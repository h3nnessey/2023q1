import './style.css';
import { BaseComponent } from '../baseComponent/BaseComponent';

export class Header extends BaseComponent {
  constructor() {
    super({ tagName: 'header', classNames: ['header'], html: '<span>Cards Selector Game</span>' });
  }
}
