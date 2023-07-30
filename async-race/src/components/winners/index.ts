import { Component } from '../component';
import { Store } from '../../store';
import { WinnersCount } from './winners-count';
import { Table } from './table';
import { Pagination } from './pagination';
import classes from './styles.module.css';

export class Winners extends Component {
  private readonly winnersCount: WinnersCount;
  private readonly table: Table;
  private readonly pagination: Pagination;

  constructor(parent: Component) {
    super({ parent, classNames: [classes.winners, classes.hidden] });

    Store.winners = this;
    this.winnersCount = new WinnersCount(this);
    this.pagination = new Pagination(this);
    this.table = new Table(this);
  }

  public update(): void {
    if (Store.winnersCurrentPage > 1 && !Store.winnersItems.length) {
      Store.winnersCurrentPage -= 1;
      Store.updateWinners().then(() => this.update());
    }
    this.winnersCount.update();
    this.table.update();
    this.pagination.update();
  }

  public hide(): void {
    this.addClass(classes.hidden);
  }

  public show(): void {
    this.removeClass(classes.hidden);
  }
}
