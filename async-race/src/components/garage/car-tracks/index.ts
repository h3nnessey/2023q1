import { Component } from '../../component';
import { Store } from '../../../store';
import { CarTrack } from './car-track';
import { EngineService } from '../../../services/engine.service';

export class CarTracks extends Component {
  private tracks: CarTrack[] = [];

  constructor(parent: Component) {
    super({ classNames: ['garage__car-tracks'], parent });

    this.createCarTracks();

    this.node.addEventListener('race-start', (event: Event) => {
      if (event instanceof CustomEvent) {
        Promise.race(this.tracks.map(({ car }) => car.start().then(() => car.drive()))).then(({ message }) => {
          console.log(`Winner is ${message}`);
          event.detail.enableResetBtn();
        });
      }
    });

    this.node.addEventListener('race-reset', (event: Event) => {
      if (event instanceof CustomEvent) {
        Promise.all(
          this.tracks.map(
            ({ car }) =>
              new Promise((resolve) => {
                resolve(EngineService.stop(car.id).then(() => car.reset()));
              })
          )
        ).then(() => {
          console.log('all cars reseted');
          event.detail.enableRaceBtn();
        });
      }
    });
  }

  public update(): void {
    this.tracks.forEach((track) => track.delete());
    this.tracks = [];
    this.node.innerHTML = '';

    this.createCarTracks();
  }

  private createCarTracks(): void {
    Store.cars.forEach((car) => {
      this.tracks.push(
        new CarTrack({
          parent: this,
          carInfo: car,
        })
      );
    });
  }
}
