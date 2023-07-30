import { Component } from '../../component';
import { Thead } from './thead';
import { Trow } from './trow';
import { Store } from '../../../store';
import classes from './styles.module.css';

export class Table extends Component {
  private readonly tableHead: Thead;
  private trows: Trow[] = [];

  constructor(parent: Component) {
    super({ classNames: [classes.winnersTable], parent });

    this.tableHead = new Thead(this);

    this.createTable();
  }

  private createTable(): void {
    Store.winnersItems.forEach((winner, index) => {
      this.trows.push(new Trow((Store.winnersCurrentPage - 1) * 10 + index + 1, winner, this));
    });
  }

  public update(): void {
    this.trows.forEach((row) => row.delete());
    this.trows = [];

    this.createTable();
  }
}
