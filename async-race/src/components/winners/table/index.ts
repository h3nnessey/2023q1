import { Component } from '../../component';
import { Thead } from './thead';
import { Trow } from './trow';
import { Store } from '../../../store';
import { WINNERS_LIMIT } from '../../../constants';
import classes from './styles.module.css';

export class Table extends Component {
  private readonly tableHead: Thead;
  private trows: Trow[] = [];

  constructor() {
    super({ classNames: [classes.table] });

    this.tableHead = new Thead(this);
    this.createRows();
  }

  private createRows(): void {
    Store.winnersItems.forEach((winner, index) => {
      this.trows.push(new Trow((Store.winnersCurrentPage - 1) * WINNERS_LIMIT + index + 1, winner, this));
    });
  }

  public update(): void {
    this.trows.forEach((row) => row.delete());
    this.trows = [];

    this.createRows();
  }
}
