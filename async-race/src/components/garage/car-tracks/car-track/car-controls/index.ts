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
    return this.car.stop().then(() => Store.garage.enableControls());
  }

  private onStart() {
    Store.garage.disableControls();
    this.car.start().then(() => {
      this.resetBtn.on();
      this.car.drive().catch(() => null);
    });
  }

  private onSelect() {
    return Store.garage.controls.controlsUpdate.focusWith(this.car);
  }

  private onDelete() {
    return GarageService.deleteCar(this.car.id).then(() => Store.updateGarage().then(() => Store.garage.update()));
  }

  public disable() {
    this.selectBtn.off();
    this.startBtn.off();
    this.deleteBtn.off();
  }

  public enable() {
    this.startBtn.on();
    this.selectBtn.on();
    this.deleteBtn.on();
  }
}
