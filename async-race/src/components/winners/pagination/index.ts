import { Component } from '../../component';
import { Button } from '../../button';
import { Store } from '../../../store';
import { Winners } from '../index';

export class Pagination extends Component {
  private readonly currentPage: Component;
  private readonly prevBtn: Button;
  private readonly nextBtn: Button;

  constructor(parent: Component) {
    super({ classNames: ['winners__pagination'], parent });

    this.prevBtn = new Button({ parent: this, text: 'Prev', disabled: true, onClick: () => this.handlePrevClick() });

    this.currentPage = new Component({
      tagName: 'h2',
      classNames: ['garage__current-page'],
      text: `Page #${Store.winnersCurrentPage}`,
      parent: this,
    });

    this.nextBtn = new Button({
      parent: this,
      text: 'Next',
      disabled: Store.winnersCurrentPage === Store.winnersPagesCount,
      onClick: () => this.handleNextClick(),
    });
  }

  private handlePrevClick(): void {
    Store.winnersCurrentPage -= 1;

    if (Store.winnersCurrentPage === 1) {
      this.prevBtn.off();
    }

    this.updateOnClick();
  }

  private updateOnClick() {
    Store.updateWinners().then(() => {
      Store.winners.update();
    });
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
