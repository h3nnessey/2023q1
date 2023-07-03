import './style.css';
import classNames from '../../../classNames';
import { BaseComponent } from '../../baseComponent/BaseComponent';
import { CssEditorTextInput } from './cssEditorTextInput/CssEditorTextInput';
import { CssEditorButton } from './cssEditorButton/cssEditorButton';

export class CssEditorInputs extends BaseComponent {
  private readonly cssEditorTextInput: CssEditorTextInput;
  private readonly cssEditorButton: CssEditorButton;

  constructor(parent: BaseComponent) {
    super({ classNames: [classNames.cssEditor.inputs], parent });

    this.cssEditorTextInput = new CssEditorTextInput(this);

    this.cssEditorButton = new CssEditorButton(
      this.cssEditorTextInput.input.node,
      this.cssEditorTextInput.code.node,
      this
    );

    this.node.addEventListener('clear-inputs', () => {
      const input = this.cssEditorTextInput.input.node as HTMLInputElement;
      input.value = '';
      this.cssEditorTextInput.code.setTextContent('');
    });
  }
}
