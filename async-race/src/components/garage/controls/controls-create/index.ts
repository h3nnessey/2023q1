import { Component } from '../../../component';
import { Input } from '../../../input';
import { Button } from '../../../button';
import { GarageService } from '../../../../services/garage.service';
import { Store } from '../../../../store';
import classes from '../styles.module.css';

export class ControlsCreate extends Component {
  private readonly textInput: Input;
  private readonly colorInput: Input;
  private readonly submitBtn: Button;

  constructor() {
    super({ classNames: [classes.controlsRow] });

    this.textInput = new Input({ placeholder: 'Enter car name' });
    this.colorInput = new Input({ type: 'color' });

    this.submitBtn = new Button({
      text: 'Create',
      onClick: () => this.onCreate(),
    });

    this.append([this.textInput, this.colorInput, this.submitBtn]);
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

  private onCreate(): void {
    const name = this.textInput.value;
    const color = this.colorInput.value;

    this.disable();

    GarageService.createCar({ name, color }).then((car) => {
      Store.updateGarage().then(() => {
        Store.garage.carTracks.onCreate(car);
        Store.garage.update(true);
        this.enable();
      });
    });
  }
}
