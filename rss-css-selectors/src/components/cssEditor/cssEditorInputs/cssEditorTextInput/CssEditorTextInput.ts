import './style.css';
import classNames from '../../../../classNames';
import { BaseComponent } from '../../../baseComponent/BaseComponent';
import { Store } from '../../../../store/Store';

export class CssEditorTextInput extends BaseComponent {
  constructor(parent: BaseComponent) {
    super({ tagName: 'input', classNames: [classNames.cssEditor.textInput], parent });

    this.setAttribute('type', 'text');

    this.addEventListener('keydown', (event: Event) => {
      // add prevent cheating handlers (like select .target)
      if (event instanceof KeyboardEvent && event.key === 'Enter') {
        try {
          const node = this.node as HTMLInputElement;

          const selected = Store.cardsTable.node.querySelectorAll(`${node.value.trim()}`);

          let answer = '';

          Array.from(selected).forEach((el) => {
            answer += el.outerHTML;
          });

          const isWin = answer === Store.currentLessonAnswer;

          if (isWin) {
            Store.cardsTable.node.dispatchEvent(new CustomEvent('win'));
            node.value = '';
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
