import { Component } from '../../component';
import { Button } from '../../button';
import { Store } from '../../../store';
import classes from './styles.module.css';

export class Pagination extends Component {
  private readonly currentPage: Component;
  private readonly prevBtn: Button;
  private readonly nextBtn: Button;

  constructor() {
    super({ classNames: [classes.pagination] });

    this.prevBtn = new Button({ text: 'Prev', onClick: () => this.handlePrevClick(), disabled: true });

    this.currentPage = new Component({
      tagName: 'h2',
      classNames: [classes.currentPage],
      text: `Page #${Store.garageCurrentPage}`,
    });

    this.nextBtn = new Button({
      text: 'Next',
      onClick: () => this.handleNextClick(),
      disabled: Store.garageCurrentPage === Store.garagePagesCount,
    });

    this.append([this.prevBtn, this.currentPage, this.nextBtn]);
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

      Promise.all(startedCars.map((track) => track.car.stop())).then(() => {
        this.updateGarageOnPagination();
        Store.garage.enableControls();
      });
    } else {
      this.updateGarageOnPagination();
    }
  }

  private updateGarageOnPagination(): void {
    Store.updateGarage().then(() => {
      Store.garagePaginationEmitted = false;
      this.enable();
      Store.garage.update();
    });
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
