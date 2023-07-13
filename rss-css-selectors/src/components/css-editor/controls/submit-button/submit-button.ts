import './styles.css';
import { classNames } from '../../class-names';
import { BaseComponent } from '../../../base-component/base-component';
import { Controls } from '../controls';

export class SubmitButton extends BaseComponent {
  private readonly controls: Controls;

  constructor(controls: Controls) {
    super({ tagName: 'button', classNames: [classNames.submitBtn], parent: controls });

    this.controls = controls;

    this.insertTextNodes([['afterbegin', 'Enter']]);

    this.addEventListener('click', () => this.controls.checkAnswer());
  }
}
