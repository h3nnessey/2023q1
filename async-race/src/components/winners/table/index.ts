import { Component } from '../../component';
import { Thead } from './thead';
import { Trow } from './trow';
import { Store } from '../../../store';

export class Table extends Component {
  private readonly tableHead: Thead;
  private trows: Trow[] = [];

  constructor(parent: Component) {
    super({ classNames: ['winners__table'], parent });

    this.tableHead = new Thead(this);

    this.createTable();
  }

  private createTable(): void {
    Store.winnersItems.forEach((winner, index) => {
      this.trows.push(new Trow(index + 1, winner, this));
    });
  }

  public update(): void {
    this.trows.forEach((row) => row.delete());
    this.trows = [];

    this.createTable();
  }
}
