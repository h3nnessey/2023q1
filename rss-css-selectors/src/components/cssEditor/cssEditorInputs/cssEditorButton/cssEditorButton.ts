import './styles.css';
import classNames from '../../../../classNames';
import { BaseComponent } from '../../../baseComponent/BaseComponent';
import { CssEditorTextInput } from '../cssEditorTextInput/CssEditorTextInput';
import { Store } from '../../../../store/Store';

export class CssEditorButton extends BaseComponent {
  constructor(private readonly cssEditorTextInput: CssEditorTextInput, parent: BaseComponent) {
    super({ tagName: 'button', classNames: [classNames.cssEditor.button], parent });

    this.insertTextNodes([['afterbegin', 'Enter']]);

    this.addEventListener('click', (event: Event) => {
      if (event instanceof MouseEvent) {
        try {
          const input = this.cssEditorTextInput.node as HTMLInputElement;

          const selected = Store.htmlViewer.node.querySelectorAll(`.html ${input.value.trim()}`);
          let html = '';

          selected.forEach((el) => {
            el.classList.add('selected');
            html += el.innerHTML;
          });

          console.log(html === Store.currentLessonAnswer ? 'You WIN!' : 'Wrong selector');
        } catch (err) {
          console.log('Not valid css-selector');
        }
      }
    });
  }
}
