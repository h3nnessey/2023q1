import './style.css';
import { BaseComponent } from '../baseComponent/BaseComponent';

export class Footer extends BaseComponent {
  constructor() {
    super({ tagName: 'footer', classNames: ['footer'] });
  }
}
