import './style.css';
import { BaseComponent } from '../../../baseComponent/BaseComponent';
import { CssEditorTextInput } from '../cssEditorTextInput/CssEditorTextInput';
import { Store } from '../../../../store/Store';
import { setLocalStorage } from '../../../../localStorage';

export class CssEditorHelpButton extends BaseComponent {
  constructor(parent: BaseComponent, cssEditorTextInputs: CssEditorTextInput) {
    super({ tagName: 'button', classNames: ['help'], parent, html: '<span>💡</span>' });

    this.addEventListener('click', () => {
      this.off();

      Store.helped.push(Store.currentLesson.id);
      setLocalStorage({
        helped: Store.helped,
        completed: Store.completed,
        current: Store.currentLesson.id,
      });
      cssEditorTextInputs.node.dispatchEvent(new CustomEvent('help'));
      Store.levelSelector.render();
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
