import { Component } from '../../../component';
import { Input } from '../../../input';
import { Button } from '../../../button';

export class ControlsUpdate extends Component {
  private readonly textInput: Input;
  private readonly colorInput: Input;
  private readonly submitBtn: Button;

  constructor(parent: Component) {
    super({ tagName: 'div', classNames: ['garage-controls__row'], parent });

    this.textInput = new Input({ parent: this, disabled: true });
    this.colorInput = new Input({ parent: this, type: 'color', disabled: true });
    this.submitBtn = new Button({ parent: this, text: 'Update', disabled: true });
  }
}
