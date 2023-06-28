import { BaseComponent } from '../../../baseComponent/BaseComponent';
import { HtmlViewer } from '../../../htmlViewer/HtmlViewer';

export class CssEditorTextInput extends BaseComponent {
  constructor(private readonly htmlViewer: HtmlViewer, private readonly lessonAnswer: string, parent: BaseComponent) {
    super({ tagName: 'input', classNames: ['css-editor__input'], parent });

    this.setAttribute('type', 'text');

    this.addEventListener('keydown', (event: Event) => {
      if (event instanceof KeyboardEvent && event.key === 'Enter') {
        try {
          const node = this.node as HTMLInputElement;

          const selected = htmlViewer.node.querySelectorAll(`.html ${node.value.trim()}`);
          let html = '';

          selected.forEach((el) => {
            el.classList.add('selected');
            html += el.innerHTML;
          });

          console.log(html === this.lessonAnswer ? 'You WIN!' : 'Wrong selector');
        } catch (err) {
          console.log('Not valid css-selector');
        }
      }
    });
  }
}
