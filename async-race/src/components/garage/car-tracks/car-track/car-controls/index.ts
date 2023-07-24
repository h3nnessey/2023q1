import { Component } from '../../../../component';
import { Button } from '../../../../button';
import { Store } from '../../../../../store';
import { GarageService } from '../../../../../services/garage.service';
import type { Car } from '../car';

export class CarControls extends Component {
  public readonly selectBtn: Button;
  public readonly deleteBtn: Button;
  public readonly startBtn: Button;
  public readonly resetBtn: Button;

  constructor(private readonly car: Car) {
    super({});

    this.selectBtn = new Button({
      parent: this,
      text: 'Select',
      onClick: () => this.onSelect(),
    });

    this.deleteBtn = new Button({
      parent: this,
      text: 'Delete',
      onClick: () => this.onDelete(),
    });

    this.startBtn = new Button({
      parent: this,
      text: 'A',
      onClick: () => this.onStart(),
    });

    this.resetBtn = new Button({
      parent: this,
      text: 'B',
      onClick: () => this.onReset(),
      disabled: true,
    });
  }

  private onReset() {
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

  private async onStart() {
    this.selectBtn.off();
    this.deleteBtn.off();
    this.startBtn.off();
    Store.garage.controls.controlsUpdate.disable();
    Store.garage.pagination.disable();
    Store.garage.controls.controlsRace.raceBtn.off();
    Store.garage.controls.controlsRace.resetBtn.off();

    this.car.start().then(() => {
      if (!Store.garageResetEmitted && !Store.garagePaginationEmitted) {
        this.resetBtn.on();
        Store.garage.controls.controlsRace.resetBtn.on();
        Store.garage.pagination.enable();
      } else {
        Store.garage.controls.controlsRace.resetBtn.off();
        Store.garage.pagination.disable();
      }

      this.car.drive().catch(() => null);
    });
  }

  private onSelect() {
    return Store.garage.controls.controlsUpdate.focusWith(this.car);
  }

  private onDelete() {
    GarageService.deleteCar(this.car.id).then(() => {
      Store.updateGarage().then(() => {
        Store.garage.carTracks.onDelete(this.car.id);
        Store.garage.update(true);
      });
    });
  }

  public disable() {
    this.selectBtn.off();
    this.startBtn.off();
    this.deleteBtn.off();
    this.resetBtn.off();
  }

  public enable() {
    this.resetBtn.off();
    this.startBtn.on();
    this.selectBtn.on();
    this.deleteBtn.on();
  }
}
