import { Component } from '../../component';
import { Button } from '../../button';
import { Store } from '../../../store';
import classes from './styles.module.css';

export class Pagination extends Component {
  private readonly currentPage: Component;
  private readonly prevBtn: Button;
  private readonly nextBtn: Button;

  constructor() {
    super({ classNames: [classes.winnersPagination] });

    this.prevBtn = new Button({ text: 'Prev', onClick: () => this.handlePrevClick(), disabled: true });

    this.currentPage = new Component({
      tagName: 'h2',
      classNames: [classes.winnersCurrentPage],
      text: `Page #${Store.winnersCurrentPage}`,
    });

    this.nextBtn = new Button({
      text: 'Next',
      onClick: () => this.handleNextClick(),
      disabled: Store.winnersCurrentPage === Store.winnersPagesCount,
    });

    this.append([this.prevBtn, this.currentPage, this.nextBtn]);
  }

  private handlePrevClick(): void {
    Store.winnersCurrentPage -= 1;

    if (Store.winnersCurrentPage === 1) {
      this.prevBtn.off();
    }

    this.updateOnClick();
  }

  private updateOnClick(): void {
    Store.winners.update();
  }

  private handleNextClick(): void {
    Store.winnersCurrentPage += 1;
    this.prevBtn.on();

    if (Store.winnersCurrentPage === Store.winnersPagesCount) {
      this.nextBtn.off();
    }

    this.updateOnClick();
  }

  public update(): void {
    if (Store.winnersCurrentPage < Store.winnersPagesCount) {
      this.nextBtn.on();
    } else {
      this.nextBtn.off();
    }

    if (Store.winnersCurrentPage === 1) this.prevBtn.off();

    this.currentPage.setTextContent(`Page #${Store.winnersCurrentPage}`);
  }
}
