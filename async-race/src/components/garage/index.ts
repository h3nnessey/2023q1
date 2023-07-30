import { Component } from '../component';
import { Controls } from './controls';
import { CarsCount } from './cars-count';
import { Pagination } from './pagination';
import { CarTracks } from './car-tracks';
import { Store } from '../../store';
import { Modal } from '../modal';
import classes from './styles.module.css';

export class Garage extends Component {
  public readonly controls: Controls;
  private readonly carsCount: CarsCount;
  public readonly pagination: Pagination;
  public readonly carTracks: CarTracks;
  private readonly modal: Modal;

  constructor() {
    super({ classNames: [classes.garage] });

    Store.garage = this;

    this.controls = new Controls();
    this.carsCount = new CarsCount();
    this.pagination = new Pagination();
    this.carTracks = new CarTracks();
    this.modal = new Modal();

    this.append([this.controls, this.carsCount, this.pagination, this.carTracks, this.modal]);
  }

  public startRace(): void {
    this.disableControls();

    this.carTracks
      .startRace()
      .then(() => this.handleRaceEnd())
      .catch(() => this.handleRaceEnd());
  }

  public resetRace(): void {
    this.controls.disable();
    Store.garage.pagination.disable();

    this.carTracks.resetRace().then(() => {
      Store.garageResetEmitted = false;
      this.enableControls();
    });
  }

  public disableControls(): void {
    this.controls.disable();
    this.pagination.disable();
    this.carTracks.disable();
  }

  private handleRaceEnd(): void {
    this.controls.handleRaceEnd();
  }

  public enableControls(): void {
    this.controls.enable();
    this.pagination.enable();
    this.carTracks.enable();
  }

  public hide(): void {
    this.addClass(classes.hidden);
  }

  public show(): void {
    this.removeClass(classes.hidden);
  }

  public update(preventFullRerender?: boolean): void {
    if (Store.garageCurrentPage > 1 && !Store.garageCars.length) {
      Store.garageCurrentPage -= 1;
      Store.updateGarage().then(() => this.update());
    } else {
      if (!preventFullRerender) this.carTracks.update();

      this.pagination.update();
      this.carsCount.update();
      this.controls.update();
    }
  }
}
