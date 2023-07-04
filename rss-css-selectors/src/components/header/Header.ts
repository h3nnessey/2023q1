import './style.css';
import { BaseComponent } from '../baseComponent/BaseComponent';

export class Header extends BaseComponent {
  constructor() {
    super({ tagName: 'header', classNames: ['header'], html: '<h1 class="header__title">Cards Selector Game</h1>' });
  }
}
