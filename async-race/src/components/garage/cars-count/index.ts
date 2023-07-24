import { Component } from '../../component';
import { Store } from '../../../store';

export class CarsCount extends Component {
  constructor(parent: Component) {
    super({ tagName: 'h1', classNames: ['garage__cars-count'], parent });

    this.update();
  }

  public update(): void {
    this.setTextContent(`Garage (${Store.garageCarsCount})`);
  }
}
