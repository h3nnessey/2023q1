import { Component } from '../../component';
import { Store } from '../../../store';
import { CarTrack } from './car-track';
import { Car } from './car-track/car';

export class CarTracks extends Component {
  public tracks: CarTrack[] = [];

  constructor(parent: Component) {
    super({ classNames: ['garage__car-tracks'], parent });

    this.createCarTracks();
  }

  public resetRace() {
    return Promise.all(this.tracks.map(({ car }) => car.stop())).then(() =>
      this.tracks.forEach((track) => track.carControls.enable())
    );
  }

  public startRace() {
    return Promise.any(this.tracks.map(({ car }) => car.start().then(() => car.drive()))).then((winner) => {
      console.log(winner);
    });
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
