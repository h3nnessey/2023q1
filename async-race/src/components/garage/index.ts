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

  constructor(parent: Component) {
    super({ parent, classNames: [classes.garage] });

    Store.garage = this;

    this.controls = new Controls(this);
    this.carsCount = new CarsCount(this);
    this.pagination = new Pagination(this);
    this.carTracks = new CarTracks(this);

    this.modal = new Modal(this);
  }

  public startRace() {
    this.disableControls();

    this.carTracks
      .startRace()
      .then(() => this.handleRaceEnd())
      .catch(() => this.handleRaceEnd());
  }

  public resetRace() {
    this.controls.disable();
    Store.garage.pagination.disable();
    this.carTracks.resetRace().then(() => {
      this.enableControls();
      Store.garageResetEmitted = false;
    });
  }

  public disableControls() {
    this.controls.disable();
    this.pagination.disable();
    this.carTracks.disable();
  }

  private handleRaceEnd() {
    this.controls.handleRaceEnd();
  }

  public enableControls() {
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

  public update(isDelete?: boolean) {
    if (Store.garageCurrentPage > 1 && !Store.garageCars.length) {
      Store.garageCurrentPage -= 1;
      Store.updateGarage().then(() => this.update());
    } else {
      if (!isDelete) this.carTracks.update();

      this.pagination.update();
      this.carsCount.update();
      this.controls.update();
    }
  }
}
