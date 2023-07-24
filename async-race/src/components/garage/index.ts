import { Component } from '../component';
import { Controls } from './controls';
import { CarsCount } from './cars-count';
import { Pagination } from './pagination';
import { CarTracks } from './car-tracks';
import { Store } from '../../store';

export class Garage extends Component {
  public readonly controls: Controls;
  private readonly carsCount: CarsCount;
  public readonly pagination: Pagination;
  public readonly carTracks: CarTracks;

  constructor(parent: Component) {
    super({ tagName: 'div', parent, classNames: ['garage'] });

    Store.garage = this;

    this.controls = new Controls(this);
    this.carsCount = new CarsCount(this);
    this.pagination = new Pagination(this);
    this.carTracks = new CarTracks(this);
  }

  public startRace() {
    this.disableControls();

    const startedTracks = this.carTracks.tracks.filter((track) => track.car.started);

    if (startedTracks.length) {
      Promise.all(
        startedTracks.map((track) => {
          this.disableControls();
          return track.car.stop();
        })
      ).then(() => {
        this.carTracks
          .startRace()
          .then(() => this.handleRaceEnd())
          .catch(() => this.handleRaceEnd());
      });
    } else {
      this.carTracks
        .startRace()
        .then(() => this.handleRaceEnd())
        .catch(() => this.handleRaceEnd());
    }
  }

  public resetRace() {
    this.controls.disable();
    this.carTracks.resetRace().then(() => this.enableControls());
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

  public update(isDelete?: boolean) {
    if (Store.currentPage > 1 && !Store.cars.length) {
      Store.currentPage -= 1;
      Store.updateGarage().then(() => this.update());
    } else {
      if (!isDelete) this.carTracks.update();

      this.pagination.update();
      this.carsCount.update();
      this.controls.update();
    }
  }
}
