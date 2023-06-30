import './style.css';
import classNames from '../../../../classNames';
import { BaseComponent } from '../../../baseComponent/BaseComponent';
import { Store } from '../../../../store/Store';

export class CssEditorTextInput extends BaseComponent {
  constructor(parent: BaseComponent) {
    super({ tagName: 'input', classNames: [classNames.cssEditor.textInput], parent });

    this.setAttribute('type', 'text');

    this.addEventListener('keydown', (event: Event) => {
      if (event instanceof KeyboardEvent && event.key === 'Enter') {
        try {
          const node = this.node as HTMLInputElement;

          const selected = Store.htmlViewer.node.querySelectorAll(`.html ${node.value.trim()}`);
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
