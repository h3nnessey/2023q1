import './styles.css';
import classNames from '../../../../classNames';
import { BaseComponent } from '../../../baseComponent/BaseComponent';
import { CssEditorTextInput } from '../cssEditorTextInput/CssEditorTextInput';
import { Store } from '../../../../store/Store';

export class CssEditorButton extends BaseComponent {
  constructor(private readonly input: HTMLElement, private readonly code: HTMLElement, parent: BaseComponent) {
    super({ tagName: 'button', classNames: [classNames.cssEditor.button], parent });

    this.insertTextNodes([['afterbegin', 'Enter']]);

    this.addEventListener('click', (event: Event) => {
      // add prevent cheating handlers (like select .target)
      if (event instanceof MouseEvent) {
        try {
          const input = this.input as HTMLInputElement;

          const selected = Store.cardsTable.node.querySelectorAll(`${input.value.trim()}`);

          let answer = '';

          Array.from(selected).forEach((el) => {
            answer += el.outerHTML;
          });

          const isWin = answer === Store.currentLessonAnswer;

          if (isWin) {
            Store.cardsTable.node.dispatchEvent(new CustomEvent('win'));
            input.value = '';
            code.textContent = '';
          } else {
            Store.cardsTable.node.dispatchEvent(new CustomEvent('wrong-answer'));
          }
        } catch (err) {
          Store.cardsTable.node.dispatchEvent(new CustomEvent('wrong-answer'));
        }
      }
    });
  }
}
