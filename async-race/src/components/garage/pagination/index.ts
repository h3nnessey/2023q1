import { Component } from '../../component';
import { Button } from '../../button';
import { Store } from '../../../store';

export class Pagination extends Component {
  private readonly currentPage: Component;
  private readonly prevBtn: Button;
  private readonly nextBtn: Button;

  constructor(parent: Component) {
    super({ tagName: 'div', classNames: ['garage__pagination'], parent });

    this.currentPage = new Component({
      tagName: 'h2',
      classNames: ['garage__current-page'],
      text: `Page #${Store.currentPage}`,
      parent: this,
    });

    this.prevBtn = new Button({ parent: this, text: 'Prev', disabled: true, onClick: () => this.handlePrevClick() });

    this.nextBtn = new Button({
      parent: this,
      text: 'Next',
      disabled: Store.currentPage === Store.pagesCount,
      onClick: () => this.handleNextClick(),
    });
  }

  public update(): void {
    if (Store.currentPage < Store.pagesCount) {
      this.nextBtn.on();
    } else {
      this.nextBtn.off();
    }

    if (Store.currentPage === 1) this.prevBtn.off();

    this.currentPage.setTextContent(`Page #${Store.currentPage}`);
  }

  private handlePrevClick(): void {
    Store.currentPage -= 1;

    if (Store.currentPage === 1) {
      this.prevBtn.off();
    }

    Store.updateGarage().then(() => Store.garage.update());
  }

  private handleNextClick(): void {
    Store.currentPage += 1;
    this.prevBtn.on();

    if (Store.currentPage === Store.pagesCount) {
      this.nextBtn.off();
    }

    Store.updateGarage().then(() => Store.garage.update());
  }

  public disable(): void {
    this.prevBtn.off();
    this.nextBtn.off();
  }

  public enable(): void {
    if (Store.currentPage === 1) {
      this.prevBtn.off();
    } else {
      this.prevBtn.on();
    }
    if (Store.currentPage === Store.pagesCount) {
      this.nextBtn.off();
    } else {
      this.nextBtn.on();
    }
  }
}
