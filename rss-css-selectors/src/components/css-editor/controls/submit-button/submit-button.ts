import './styles.css';
import { classNames } from '../../class-names';
import { BaseComponent } from '../../../baseComponent/BaseComponent';
import { Controls } from '../controls';

export class SubmitButton extends BaseComponent {
  private readonly controls: Controls;

  constructor(controls: Controls) {
    super({ tagName: 'button', classNames: [classNames.submitBtn], parent: controls });

    this.controls = controls;

    this.insertTextNodes([['afterbegin', 'Enter']]);

    this.addEventListener('click', (event: Event) => {
      if (event instanceof MouseEvent) {
        this.controls.checkAnswer();
      }
    });
  }
}
