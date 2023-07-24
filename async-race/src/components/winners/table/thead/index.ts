import { Component } from '../../../component';
import { Button } from '../../../button';

export class Thead extends Component {
  private readonly number: Component;
  private readonly car: Component;
  private readonly name: Component;
  private readonly winsBtn: Button;
  private readonly bestTimeBtn: Button;

  constructor(parent: Component) {
    super({ classNames: ['winners-table__head'], parent });

    this.winsBtn = new Button({ text: 'Wins', classNames: ['winners-table__wins-sort'] });
    this.bestTimeBtn = new Button({ text: 'Best Time', classNames: ['winners-table__time-sort'] });
    this.number = new Component({ text: 'Number', classNames: ['winners-table__number'] });
    this.car = new Component({ text: 'Car', classNames: ['winners-table__car'] });
    this.name = new Component({ text: 'Name', classNames: ['winners-table__name'] });

    this.append([this.number, this.car, this.name, this.winsBtn, this.bestTimeBtn]);
  }
}
