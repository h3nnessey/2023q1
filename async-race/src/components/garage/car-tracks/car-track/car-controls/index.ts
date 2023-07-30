import { Component } from '../../../../component';
import { Button } from '../../../../button';
import { Store } from '../../../../../store';
import { GarageService } from '../../../../../services/garage.service';
import type { Car } from '../car';
import { WinnersService } from '../../../../../services/winners.service';

export class CarControls extends Component {
  public readonly selectBtn: Button;
  public readonly deleteBtn: Button;
  public readonly startBtn: Button;
  public readonly resetBtn: Button;

  constructor(private readonly car: Car) {
    super({});

    this.selectBtn = new Button({
      text: 'Select',
      onClick: () => this.onSelect(),
    });

    this.deleteBtn = new Button({
      text: 'Delete',
      onClick: () => this.onDelete(),
    });

    this.startBtn = new Button({
      text: 'A',
      onClick: () => this.onStart(),
    });

    this.resetBtn = new Button({
      text: 'B',
      onClick: () => this.onReset(),
      disabled: true,
    });

    this.append([this.selectBtn, this.deleteBtn, this.startBtn, this.resetBtn]);
  }

  private onReset(): void {
    this.resetBtn.off();
    Store.garage.controls.controlsRace.resetBtn.off();

    this.car.stop().then(() => {
      this.enable();
      if (Store.garage.carTracks.tracks.filter((track) => track.car.started).length) {
        Store.garage.controls.controlsRace.resetBtn.on();
      } else {
        Store.garage.controls.controlsRace.resetBtn.off();
        Store.garage.controls.controlsRace.raceBtn.on();
      }
    });
  }

  private async onStart(): Promise<void> {
    this.disableControlsOnStart();

    this.car.start().then(() => {
      if (!Store.garageResetEmitted && !Store.garagePaginationEmitted) {
        Store.garage.pagination.enable();
        Store.garage.controls.controlsRace.resetBtn.on();
        this.resetBtn.on();
      } else {
        Store.garage.pagination.disable();
        Store.garage.controls.controlsRace.resetBtn.off();
      }

      this.car.drive().then();
    });
  }

  private onSelect(): void {
    return Store.garage.controls.controlsUpdate.focus(this.car);
  }

  private onDelete(): void {
    GarageService.deleteCar(this.car.id).then(() => {
      Store.updateGarage().then(() => {
        Store.garage.carTracks.onDelete(this.car.id);
        Store.garage.update(true);
      });
    });

    WinnersService.deleteWinner(this.car.id).then((success) => {
      if (success) {
        Store.winners.update();
      }
    });
  }

  private disableControlsOnStart(): void {
    this.selectBtn.off();
    this.deleteBtn.off();
    this.startBtn.off();
    Store.garage.controls.controlsUpdate.disable();
    Store.garage.pagination.disable();
    Store.garage.controls.controlsRace.raceBtn.off();
    Store.garage.controls.controlsRace.resetBtn.off();
  }

  public disable(): void {
    this.selectBtn.off();
    this.startBtn.off();
    this.deleteBtn.off();
    this.resetBtn.off();
  }

  public enable(): void {
    this.resetBtn.off();
    this.startBtn.on();
    this.selectBtn.on();
    this.deleteBtn.on();
  }
}
