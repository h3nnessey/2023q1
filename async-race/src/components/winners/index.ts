import { Component } from '../component';
import { Store } from '../../store';
import { WinnersCount } from './winners-count';
import { Table } from './table';
import { Pagination } from './pagination';

export class Winners extends Component {
  private readonly winnersCount: WinnersCount;
  private readonly table: Table;
  private readonly pagination: Pagination;

  constructor(parent: Component) {
    super({ parent, classNames: ['winners', 'hidden'] });

    Store.winners = this;
    this.winnersCount = new WinnersCount(this);
    this.pagination = new Pagination(this);
    this.table = new Table(this);
  }

  public update(): void {
    this.winnersCount.update();
    this.pagination.update();
    this.table.update();
  }
}
