import { Component } from '../../component';
import { Store } from '../../../store';

export class WinnersCount extends Component {
  constructor(parent: Component) {
    super({ tagName: 'h2', classNames: ['winners__count'], parent });

    this.update();
  }

  public update(): void {
    this.setTextContent(`Winners (${Store.winnersCount})`);
  }
}
