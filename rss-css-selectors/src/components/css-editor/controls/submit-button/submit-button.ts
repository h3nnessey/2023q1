import './styles.css';
import { classNames } from '../../class-names';
import { BaseComponent } from '../../../base-component/base-component';
import { Controls } from '../controls';

export class SubmitButton extends BaseComponent {
  constructor(private readonly controls: Controls) {
    super({ tagName: 'button', classNames: [classNames.submitBtn], parent: controls });

    this.insertTextNodes([['afterbegin', 'Enter']]);
    this.addEventListener('click', () => this.controls.checkAnswer());
  }
}
