import { Component } from '../../../component';
import { Button } from '../../../button';
import { Store } from '../../../../store';
import classes from './styles.module.css';
import { SortType } from '../../../../types';

export class Thead extends Component {
  private readonly number: Component;
  private readonly car: Component;
  private readonly name: Component;
  private readonly winsBtn: Button;
  private readonly bestTimeBtn: Button;

  constructor(parent: Component) {
    super({ classNames: [classes.thead], parent });

    this.winsBtn = new Button({
      text: 'Wins',
      classNames: [classes.winsSort],
      onClick: () => this.handleClick('wins'),
    });

    this.bestTimeBtn = new Button({
      text: 'Best Time',
      classNames: [classes.timeSort],
      onClick: () => this.handleClick('time'),
    });

    this.number = new Component({ text: 'Number', classNames: [classes.number] });
    this.car = new Component({ text: 'Car', classNames: [classes.car] });
    this.name = new Component({ text: 'Name', classNames: [classes.name] });

    this.append([this.number, this.car, this.name, this.winsBtn, this.bestTimeBtn]);
  }

  private handleClick(type: SortType): void {
    Store.setSort(type);

    switch (type) {
      case 'wins': {
        this.bestTimeBtn.setTextContent('Best Time');
        this.winsBtn.setTextContent(Store.winnersSort.order === 'ASC' ? 'Wins ↓' : 'Wins ↑');
        break;
      }
      case 'time': {
        this.winsBtn.setTextContent('Wins');
        this.bestTimeBtn.setTextContent(Store.winnersSort.order === 'ASC' ? 'Best Time ↓' : 'Best Time ↑');
        break;
      }
      default: {
        return;
      }
    }

    Store.winners.update();
  }
}
