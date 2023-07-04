import './styles.css';
import classNames from '../../../../classNames';
import { BaseComponent } from '../../../baseComponent/BaseComponent';
import { CssEditorTextInput } from '../cssEditorTextInput/CssEditorTextInput';
import { Store } from '../../../../store/Store';
import { setLocalStorage } from '../../../../localStorage';

export class CssEditorButton extends BaseComponent {
  constructor(private readonly input: HTMLElement, private readonly code: HTMLElement, parent: BaseComponent) {
    super({ tagName: 'button', classNames: [classNames.cssEditor.button], parent });

    this.insertTextNodes([['afterbegin', 'Enter']]);

    this.addEventListener('click', (event: Event) => {
      if (event instanceof MouseEvent) {
        try {
          const input = this.input as HTMLInputElement;

          if (input.value.includes('.target')) throw new Error('Cheating');

          const selected = Store.cardsTable.node.querySelectorAll(`${input.value.trim()}`);

          let answer = '';

          Array.from(selected).forEach((el) => {
            answer += el.outerHTML;
          });

          const isWin = answer === Store.currentLessonAnswer;

          if (isWin) {
            Store.completed.push(Store.currentLesson.id);
            setLocalStorage({
              completed: Store.completed,
              helped: Store.helped,
              current: Store.currentLesson.id,
            });
            Store.app.gameInfo.render();
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
