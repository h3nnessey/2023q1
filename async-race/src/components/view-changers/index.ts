import { Component } from '../component';
import { Button } from '../button';
import { Store } from '../../store';
import classes from './styles.module.css';

export class ViewChangers extends Component {
  private toGarageBtn: Button;
  private toWinnersBtn: Button;

  constructor(parent: Component) {
    super({ classNames: [classes.container], parent });

    this.toGarageBtn = new Button({
      parent: this,
      text: 'Garage',
      classNames: [classes.button, classes.active],
      onClick: () => {
        this.toWinnersBtn.removeClass(classes.active);
        this.toGarageBtn.addClass(classes.active);

        this.showGarage();
      },
    });

    this.toWinnersBtn = new Button({
      parent: this,
      text: 'Winners',
      classNames: [classes.button],
      onClick: () => {
        this.toGarageBtn.removeClass(classes.active);
        this.toWinnersBtn.addClass(classes.active);
        this.showWinners();
      },
    });
  }

  private showGarage(): void {
    Store.garage.show();
    Store.winners.hide();
  }

  private showWinners(): void {
    Store.winners.show();
    Store.garage.hide();
  }
}
