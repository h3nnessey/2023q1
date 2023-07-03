import './style.css';
import { BaseComponent } from '../../../baseComponent/BaseComponent';
import { CssEditorTextInput } from '../cssEditorTextInput/CssEditorTextInput';

export class CssEditorHelpButton extends BaseComponent {
  constructor(parent: BaseComponent, cssEditorTextInputs: CssEditorTextInput) {
    super({ tagName: 'button', classNames: ['help'], parent, html: '<span>💡</span>' });

    this.addEventListener('click', () => {
      this.off();
      cssEditorTextInputs.node.dispatchEvent(new CustomEvent('help'));
    });
  }

  public on(): void {
    const node = this.node as HTMLButtonElement;
    node.disabled = false;
  }

  public off(): void {
    const node = this.node as HTMLButtonElement;
    node.disabled = true;
  }
}
