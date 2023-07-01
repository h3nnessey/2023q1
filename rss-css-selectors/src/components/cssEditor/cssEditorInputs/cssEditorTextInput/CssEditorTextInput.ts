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
          let html = '';

          Array.from(selected).forEach((el) => {
            html += el.outerHTML;
          });
          console.log(html);
          console.log(html === Store.currentLessonAnswer ? 'You WIN!' : 'Wrong selector');
        } catch (err) {
          console.log('Not valid css-selector');
        }
      }
    });
  }
}
