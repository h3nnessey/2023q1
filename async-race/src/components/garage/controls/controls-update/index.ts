import { Component } from '../../../component';
import { Input } from '../../../input';
import { Button } from '../../../button';
import { GarageService } from '../../../../services/garage.service';
import type { Car } from '../../car-tracks/car-track/car';

export class ControlsUpdate extends Component {
  private readonly textInput: Input;
  private readonly colorInput: Input;
  private readonly submitBtn: Button;
  private car: Car | null = null;

  constructor(parent: Component) {
    super({ tagName: 'div', classNames: ['garage-controls__row'], parent });

    this.textInput = new Input({ parent: this, disabled: true });
    this.colorInput = new Input({ parent: this, type: 'color', disabled: true });
    this.submitBtn = new Button({
      parent: this,
      text: 'Update',
      disabled: true,
      onClick: () => {
        if (this.car) {
          const name = this.textInput.value;
          const color = this.colorInput.value;

          this.car.updateCar(name, color);

          GarageService.updateCar(this.car.id, { name, color }).then(() => this.disable());
        }
      },
    });
  }

  public focusWith(car: Car): void {
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
