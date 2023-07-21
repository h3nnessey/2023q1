import { Component } from '../../../component';
import { Input } from '../../../input';
import { Button } from '../../../button';
import { GarageService } from '../../../../services/garage.service';

export class ControlsCreate extends Component {
  private readonly textInput: Input;
  private readonly colorInput: Input;
  private readonly submitBtn: Button;

  constructor(parent: Component) {
    super({ classNames: ['garage-controls__row'], parent });

    this.textInput = new Input({ parent: this });
    this.colorInput = new Input({ parent: this, type: 'color' });

    this.submitBtn = new Button({
      parent: this,
      text: 'Create',
      onClick: () => {
        GarageService.createCar({
          name: this.textInput.value,
          color: this.colorInput.value,
        }).then((data) => {
          this.submitBtn.on();
          this.textInput.value = '';
          this.colorInput.value = '#000000';

          console.log(data);
        });
      },
    });
  }
}
