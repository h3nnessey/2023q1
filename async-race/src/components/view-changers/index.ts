import { Component } from '../component';
import { Button } from '../button';
import { Store } from '../../store';

export class ViewChangers extends Component {
  private toGarageBtn: Button;
  private toWinnersBtn: Button;

  constructor(parent: Component) {
    super({ tagName: 'div', classNames: ['view-changers'], parent });

    this.toGarageBtn = new Button({
      parent: this,
      text: 'Garage',
      classNames: ['active'],
      onClick: () => {
        this.toWinnersBtn.removeClass('active');

        Store.winners.addClass('hidden');
        Store.garage.removeClass('hidden');

        this.toGarageBtn.addClass('active');
      },
    });

    this.toWinnersBtn = new Button({
      parent: this,
      text: 'Winners',
      onClick: () => {
        this.toGarageBtn.removeClass('active');

        Store.garage.addClass('hidden');
        Store.winners.removeClass('hidden');

        this.toWinnersBtn.addClass('active');
      },
    });
  }
}
