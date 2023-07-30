import { Component } from '../../component';
import { Store } from '../../../store';
import classes from './styles.module.css';

export class CarsCount extends Component {
  constructor() {
    super({ tagName: 'h1', classNames: [classes.carsCount] });

    this.update();
  }

  public update(): void {
    this.setTextContent(`Garage (${Store.garageCarsCount})`);
  }
}
