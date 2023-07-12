import './style.css';
import { BaseComponent } from '../baseComponent/BaseComponent';

export class Header extends BaseComponent {
  private readonly title: BaseComponent;

  constructor() {
    super({ tagName: 'header', classNames: ['header'] });

    this.title = new BaseComponent({
      tagName: 'h1',
      classNames: ['header__title'],
      text: 'Cards Selector Game',
      parent: this,
    });
  }
}
