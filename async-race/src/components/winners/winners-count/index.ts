import { Component } from '../../component';
import { Store } from '../../../store';
import classes from './style.module.css';

export class WinnersCount extends Component {
  constructor(parent: Component) {
    super({ tagName: 'h2', classNames: [classes.winnersCount], parent });

    this.update();
  }

  public update(): void {
    this.setTextContent(`Winners (${Store.winnersCount})`);
  }
}
