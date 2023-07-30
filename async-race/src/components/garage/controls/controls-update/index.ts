import { Component } from '../../../component';
import { Input } from '../../../input';
import { Button } from '../../../button';
import { GarageService } from '../../../../services/garage.service';
import type { Car } from '../../car-tracks/car-track/car';
import { Store } from '../../../../store';
import classes from '../styles.module.css';

export class ControlsUpdate extends Component {
  private readonly textInput: Input;
  private readonly colorInput: Input;
  private readonly submitBtn: Button;
  private car: Car | null = null;

  constructor() {
    super({ classNames: [classes.controlsRow] });

    this.textInput = new Input({ disabled: true });

    this.colorInput = new Input({ type: 'color', disabled: true });

    this.submitBtn = new Button({
      text: 'Update',
      onClick: () => this.handleSubmitClick(),
      disabled: true,
    });

    this.append([this.textInput, this.colorInput, this.submitBtn]);
  }

  private handleSubmitClick(): void {
    if (this.car) {
      const name = this.textInput.value;
      const color = this.colorInput.value;

      this.car.updateCar(name, color);

      GarageService.updateCar(this.car.id, { name, color }).then(() => {
        this.disable();
        const carInWinners = Store.winnersItems.find((car) => this.car && this.car.id === car.id);
        if (carInWinners) Store.winners.update();
      });
    }
  }

  public focus(car: Car): void {
    this.enableInputs();
    this.car = car;
    this.textInput.value = car.name;
    this.colorInput.value = car.color;
  }

  private enableInputs(): void {
    this.textInput.on();
    this.colorInput.on();
    this.submitBtn.on();
  }

  private reset(): void {
    this.textInput.value = '';
    this.colorInput.value = '#000000';
  }

  public disable(): void {
    this.reset();
    this.textInput.off();
    this.colorInput.off();
    this.submitBtn.off();
  }
}
