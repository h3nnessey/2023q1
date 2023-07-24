import { Component } from '../../component';
import { Store } from '../../../store';
import { CarTrack } from './car-track';
import { ICar } from '../../../types';

export class CarTracks extends Component {
  public tracks: CarTrack[] = [];

  constructor(parent: Component) {
    super({ classNames: ['garage__car-tracks'], parent });

    this.createCarTracks();
  }

  public resetRace() {
    Store.resetEmitted = true;
    return Promise.all(this.tracks.map(({ car }) => car.stop())).then(() =>
      this.tracks.forEach((track) => track.carControls.enable())
    );
  }

  public startRace() {
    return Promise.any(this.tracks.map(({ car }) => car.start().then((startTime) => car.drive(startTime)))).then(
      (winner) => {
        console.log(winner);
      }
    );
  }

  public update(): void {
    this.tracks.forEach((track) => track.delete());
    this.tracks = [];
    this.node.innerHTML = '';

    this.createCarTracks();
  }

  public onDelete(id: number): void {
    const toDelete = this.tracks.find((track) => track.car.id === id);
    if (toDelete) toDelete.delete();

    this.tracks = this.tracks.filter((track) => track.car.id !== id);

    if (Store.cars.length > 6) {
      this.tracks.push(
        new CarTrack({
          parent: this,
          carInfo: Store.cars[Store.cars.length - 1],
        })
      );
    }
  }

  public onCreate(car: ICar): void {
    if (this.tracks.length < 7) {
      this.tracks.push(
        new CarTrack({
          parent: this,
          carInfo: car,
        })
      );
    }
  }

  public onGenerate(): void {
    const cars = [...Store.cars];

    cars.reverse().forEach((car) => {
      this.onCreate(car);
    });
  }

  private createCarTracks(): void {
    this.tracks = Store.cars.map(
      (car) =>
        new CarTrack({
          parent: this,
          carInfo: car,
        })
    );
  }

  public disable(): void {
    this.tracks.forEach((track) => track.disable());
  }

  public enable(): void {
    this.tracks.forEach((track) => track.enable());
  }
}
