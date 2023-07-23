import { Component } from '../../../component';
import { Input } from '../../../input';
import { Button } from '../../../button';
import { ICar } from '../../../../types';
import { GarageService } from '../../../../services/garage.service';
import { Store } from '../../../../store';

export class ControlsUpdate extends Component {
  private readonly textInput: Input;
  private readonly colorInput: Input;
  private readonly submitBtn: Button;

  private id: number = 1;
  private color: string = '';
  private name: string = '';

  constructor(parent: Component) {
    super({ tagName: 'div', classNames: ['garage-controls__row'], parent });

    this.textInput = new Input({ parent: this, disabled: true });
    this.colorInput = new Input({ parent: this, type: 'color', disabled: true });
    this.submitBtn = new Button({
      parent: this,
      text: 'Update',
      disabled: true,
      onClick: () => {
        this.disable();
        GarageService.updateCar(this.id, { name: this.textInput.value, color: this.colorInput.value }).then(() => {
          this.reset();
          Store.updateGarage().then(() => Store.garage.update());
        });
      },
    });
  }

  public focusWith({ id, name, color }: ICar): void {
    this.enableInputs();

    this.id = id;
    this.name = name;
    this.color = color;

    this.textInput.value = name;
    this.colorInput.value = color;
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
