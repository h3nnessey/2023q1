import { Component } from '../../component';
import { Button } from '../../button';
import { Store } from '../../../store';
import classes from './styles.module.css';

export class Pagination extends Component {
  private readonly currentPage: Component;
  private readonly prevBtn: Button;
  private readonly nextBtn: Button;

  constructor(parent: Component) {
    super({ classNames: [classes.pagination], parent });

    this.prevBtn = new Button({ parent: this, text: 'Prev', disabled: true, onClick: () => this.handlePrevClick() });

    this.currentPage = new Component({
      tagName: 'h2',
      classNames: [classes.currentPage],
      text: `Page #${Store.garageCurrentPage}`,
      parent: this,
    });

    this.nextBtn = new Button({
      parent: this,
      text: 'Next',
      disabled: Store.garageCurrentPage === Store.garagePagesCount,
      onClick: () => this.handleNextClick(),
    });
  }

  public update(): void {
    if (Store.garageCurrentPage < Store.garagePagesCount) {
      this.nextBtn.on();
    } else {
      this.nextBtn.off();
    }

    if (Store.garageCurrentPage === 1) this.prevBtn.off();

    this.currentPage.setTextContent(`Page #${Store.garageCurrentPage}`);
  }

  private handlePrevClick(): void {
    Store.garageCurrentPage -= 1;

    if (Store.garageCurrentPage === 1) {
      this.prevBtn.off();
    }

    this.handleClickWithStartedCars();
  }

  private handleClickWithStartedCars() {
    const startedCars = Store.garage.carTracks.tracks.filter((track) => track.car.started);
    Store.garagePaginationEmitted = true;
    if (startedCars.length) {
      this.disable();
      Store.garage.disableControls();

      Promise.all(startedCars.map((track) => track.car.stop())).then(() =>
        Store.updateGarage().then(() => {
          Store.garage.update();

          Store.garage.enableControls();
          this.enable();
          Store.garagePaginationEmitted = false;
        })
      );
    } else {
      Store.updateGarage().then(() => {
        Store.garage.update();
        this.enable();
        Store.garagePaginationEmitted = false;
      });
    }
  }

  private handleNextClick(): void {
    Store.garageCurrentPage += 1;
    this.prevBtn.on();

    if (Store.garageCurrentPage === Store.garagePagesCount) {
      this.nextBtn.off();
    }

    this.handleClickWithStartedCars();
  }

  public disable(): void {
    this.prevBtn.off();
    this.nextBtn.off();
  }

  public enable(): void {
    if (Store.garageCurrentPage === 1) {
      this.prevBtn.off();
    } else {
      this.prevBtn.on();
    }
    if (Store.garageCurrentPage === Store.garagePagesCount) {
      this.nextBtn.off();
    } else {
      this.nextBtn.on();
    }
  }
}
