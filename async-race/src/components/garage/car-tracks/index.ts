import { Component } from '../../component';
import { Store } from '../../../store';
import { CarTrack } from './car-track';

export class CarTracks extends Component {
  private tracks: CarTrack[] = [];

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
