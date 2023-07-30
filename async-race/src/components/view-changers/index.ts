import { Component } from '../component';
import { Button } from '../button';
import { Store } from '../../store';
import classes from './styles.module.css';

export class ViewChangers extends Component {
  private readonly toGarageBtn: Button;
  private readonly toWinnersBtn: Button;

  constructor() {
    super({ classNames: [classes.container] });

    this.toGarageBtn = new Button({
      text: 'Garage',
      classNames: [classes.button, classes.active],
      onClick: () => this.handleToGarageClick(),
    });

    this.toWinnersBtn = new Button({
      text: 'Winners',
      classNames: [classes.button],
      onClick: () => this.handleToWinnersClick(),
    });

    this.append([this.toGarageBtn, this.toWinnersBtn]);
  }

  private handleToWinnersClick(): void {
    this.toGarageBtn.removeClass(classes.active);
    this.toWinnersBtn.addClass(classes.active);
    this.showWinners();
  }

  private handleToGarageClick(): void {
    this.toWinnersBtn.removeClass(classes.active);
    this.toGarageBtn.addClass(classes.active);
    this.showGarage();
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
