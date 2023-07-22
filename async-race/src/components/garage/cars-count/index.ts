import { Component } from '../../component';
import { Store } from '../../../store';

export class CarsCount extends Component {
  constructor(parent: Component) {
    super({ tagName: 'h1', classNames: ['garage__cars-count'], parent });

    this.setTextContent(`Garage (${Store.carsCount})`);
  }

  public update(): void {
    this.setTextContent(`Garage (${Store.carsCount})`);
  }
}
