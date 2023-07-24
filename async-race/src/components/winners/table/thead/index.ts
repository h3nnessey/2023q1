import { Component } from '../../../component';
import { Button } from '../../../button';
import { Store } from '../../../../store';

export class Thead extends Component {
  private readonly number: Component;
  private readonly car: Component;
  private readonly name: Component;
  private readonly winsBtn: Button;
  private readonly bestTimeBtn: Button;

  constructor(parent: Component) {
    super({ classNames: ['winners-table__head'], parent });

    this.winsBtn = new Button({
      text: 'Wins',
      classNames: ['winners-table__wins-sort'],
      onClick: () => this.handleWinsClick(),
    });
    this.bestTimeBtn = new Button({
      text: 'Best Time',
      classNames: ['winners-table__time-sort'],
      onClick: () => this.handleTimeClick(),
    });
    this.number = new Component({ text: 'Number', classNames: ['winners-table__number'] });
    this.car = new Component({ text: 'Car', classNames: ['winners-table__car'] });
    this.name = new Component({ text: 'Name', classNames: ['winners-table__name'] });

    this.append([this.number, this.car, this.name, this.winsBtn, this.bestTimeBtn]);
  }

  private handleWinsClick(): void {
    Store.winnersSort = 'wins';

    this.bestTimeBtn.setTextContent('Best Time');

    if (Store.winnersOrder === 'ASC') {
      Store.winnersOrder = 'DESC';
      this.winsBtn.setTextContent('Wins ↓');
    } else {
      Store.winnersOrder = 'ASC';
      this.winsBtn.setTextContent('Wins ↑');
    }

    Store.updateWinners().then(() => {
      Store.winners.update();
    });
  }

  private handleTimeClick(): void {
    Store.winnersSort = 'time';
    this.winsBtn.setTextContent('Wins');
    if (Store.winnersOrder === 'ASC') {
      Store.winnersOrder = 'DESC';
      this.bestTimeBtn.setTextContent('Best Time ↓');
    } else {
      Store.winnersOrder = 'ASC';
      this.bestTimeBtn.setTextContent('Best Time ↑');
    }

    Store.updateWinners().then(() => {
      Store.winners.update();
    });
  }
}
