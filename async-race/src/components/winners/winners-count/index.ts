import { Component } from '../../component';
import { Store } from '../../../store';
import classes from './style.module.css';

export class WinnersCount extends Component {
  constructor() {
    super({ tagName: 'h2', classNames: [classes.winnersCount] });

    this.update();
  }

  public update(): void {
    this.setTextContent(`Winners (${Store.winnersCount})`);
  }
}
