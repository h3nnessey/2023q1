import './style.css';
import { BaseComponent } from '../baseComponent/BaseComponent';

export class Header extends BaseComponent {
  constructor() {
    super({ tagName: 'header', classNames: ['header'] });
  }
}
