import './style.css';
import { BaseComponent } from '../../../baseComponent/BaseComponent';
import { HtmlViewer } from '../../../htmlViewer/HtmlViewer';
import { CssEditorTextInput } from '../cssEditorTextInput/CssEditorTextInput';

export class CssEditorButton extends BaseComponent {
  constructor(
    private readonly cssEditorTextInput: CssEditorTextInput,
    private readonly htmlViewer: HtmlViewer,
    private readonly lessonAnswer: string,
    parent: BaseComponent
  ) {
    super({ tagName: 'button', classNames: ['css-editor__button'], parent });

    this.insertTextNodes([['afterbegin', 'Enter']]);

    this.addEventListener('click', (event: Event) => {
      if (event instanceof MouseEvent) {
        try {
          const input = this.cssEditorTextInput.node as HTMLInputElement;

          const selected = htmlViewer.node.querySelectorAll(`.html ${input.value.trim()}`);
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
