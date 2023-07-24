import { Component } from '../../component';
import { Store } from '../../../store';
import { CarTrack } from './car-track';
import { ICar } from '../../../types';
import { WinnersService } from '../../../services/winners.service';

export class CarTracks extends Component {
  public tracks: CarTrack[] = [];

  constructor(parent: Component) {
    super({ classNames: ['garage__car-tracks'], parent });

    this.createCarTracks();
  }

  public resetRace() {
    Store.garageResetEmitted = true;

    Store.modal.hide();

    return Promise.all(this.tracks.filter((track) => track.car.started).map(({ car }) => car.stop())).then(() =>
      this.tracks.forEach((track) => track.carControls.enable())
    );
  }

  public startRace() {
    return Promise.any(this.tracks.map(({ car }) => car.start().then((startTime) => car.drive(startTime)))).then(
      (winner) => {
        Store.modal.show(winner.name, winner.time);
        this.handleWin(winner);
      }
    );
  }

  public update(): void {
    this.tracks.forEach((track) => track.delete());
    this.tracks = [];
    this.node.innerHTML = '';

    this.createCarTracks();
  }

  private handleWin(winner: ICar & { time: number }) {
    WinnersService.getWinner(winner.id).then((data) => {
      if (data) {
        const payload = { id: winner.id, time: winner.time < data.time ? winner.time : data.time, wins: data.wins + 1 };
        WinnersService.updateWinner(payload).then(() => {
          Store.updateWinners().then(() => Store.winners.update());
        });
      } else {
        WinnersService.createWinner({ id: winner.id, time: winner.time, wins: 1 }).then(() => {
          Store.updateWinners().then(() => Store.winners.update());
        });
      }
    });
  }

  public onDelete(id: number): void {
    const toDelete = this.tracks.find((track) => track.car.id === id);
    if (toDelete) toDelete.delete();

    this.tracks = this.tracks.filter((track) => track.car.id !== id);

    if (Store.garageCars.length > 6) {
      this.tracks.push(
        new CarTrack({
          parent: this,
          carInfo: Store.garageCars[Store.garageCars.length - 1],
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
    const cars = [...Store.garageCars];

    cars.reverse().forEach((car) => {
      this.onCreate(car);
    });
  }

  private createCarTracks(): void {
    this.tracks = Store.garageCars.map(
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
