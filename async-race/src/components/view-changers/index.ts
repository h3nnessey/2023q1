import { Component } from '../component';
import { Button } from '../button';

export class ViewChangers extends Component {
  private toGarageBtn: Button;

  private toWinnersBtn: Button;

  constructor(parent: Component) {
    super({ tagName: 'div', classNames: ['view-changers'], parent });

    this.toGarageBtn = new Button({
      parent: this,
      text: 'To Garage',
    });

    this.toWinnersBtn = new Button({
      parent: this,
      text: 'To Winners',
    });
  }
}
