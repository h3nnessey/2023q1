import { Component } from '../../component';
import { Button } from '../../button';
import { Store } from '../../../store';

export class Pagination extends Component {
  private readonly currentPage: Component;
  private readonly prevBtn: Button;
  private readonly nextBtn: Button;

  constructor(parent: Component) {
    super({ tagName: 'div', classNames: ['garage__pagination'], parent });

    this.currentPage = new Component({
      tagName: 'h2',
      classNames: ['garage__current-page'],
      text: `Page #${Store.currentPage}`,
      parent: this,
    });

    this.prevBtn = new Button({ parent: this, text: 'Prev', disabled: true });
    this.nextBtn = new Button({ parent: this, text: 'Next' });
  }
}
