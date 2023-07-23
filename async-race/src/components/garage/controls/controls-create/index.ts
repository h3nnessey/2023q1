import { Component } from '../../../component';
import { Input } from '../../../input';
import { Button } from '../../../button';
import { GarageService } from '../../../../services/garage.service';
import { Store } from '../../../../store';

export class ControlsCreate extends Component {
  private readonly textInput: Input;
  private readonly colorInput: Input;
  private readonly submitBtn: Button;

  constructor(parent: Component) {
    super({ classNames: ['garage-controls__row'], parent });

    this.textInput = new Input({ parent: this, placeholder: 'Enter car name' });
    this.colorInput = new Input({ parent: this, type: 'color' });

    this.submitBtn = new Button({
      parent: this,
      text: 'Create',
      onClick: () => {
        GarageService.createCar({
          name: this.textInput.value,
          color: this.colorInput.value,
        }).then(() => {
          this.reset();
          Store.updateGarage().then(() => Store.garage.update());
        });
      },
    });
  }

  public disable(): void {
    this.reset();
    this.textInput.off();
    this.colorInput.off();
    this.submitBtn.off();
  }

  public enable(): void {
    this.textInput.on();
    this.colorInput.on();
    this.submitBtn.on();
  }

  private reset(): void {
    this.textInput.value = '';
    this.colorInput.value = '#000000';
  }
}
