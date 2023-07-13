import './style.css';
import { classNames } from '../class-names';
import { BaseComponent } from '../../base-component/base-component';
import { SelectorInput } from './selector-input/selector-input';
import { SubmitButton } from './submit-button/submit-button';
import { HelpButton } from './help-button/help-button';
import { Store } from '../../../store';

export class Controls extends BaseComponent {
  private readonly selectorInput: SelectorInput;
  private readonly submitButton: SubmitButton;
  private readonly helpButton: HelpButton;

  constructor(parent: BaseComponent) {
    super({ classNames: [classNames.controls], parent });

    this.selectorInput = new SelectorInput(this);
    this.submitButton = new SubmitButton(this);
    this.helpButton = new HelpButton(this, this.selectorInput);
  }

  public checkAnswer(): void {
    try {
      const inputNode = this.selectorInput.input.node as HTMLInputElement;
      const selected = Store.cards.node.querySelectorAll(`${inputNode.value.trim()}`);

      const answer = Array.from(selected).reduce((acc, curr) => acc + curr.outerHTML, '');

      if (answer === Store.currentLevelAnswer) {
        this.handleCorrectAnswer();
      } else {
        this.handleWrongAnswer();
      }
    } catch (error) {
      this.handleWrongAnswer();
    }
  }

  private handleWrongAnswer(): void {
    Store.cards.node.dispatchEvent(new CustomEvent('wrong-answer'));
  }

  private handleCorrectAnswer(): void {
    const inputNode = this.selectorInput.input.node as HTMLInputElement;
    Store.setCompleted();
    Store.app.levelInfo.render();
    Store.cards.node.dispatchEvent(new CustomEvent('win'));
    inputNode.value = '';
    this.selectorInput.highlightedInput.setTextContent('');
  }

  public clear(): void {
    const input = this.selectorInput.input.node as HTMLInputElement;
    input.value = '';
    this.selectorInput.highlightedInput.setTextContent('');
    this.helpButton.on();
  }
}
