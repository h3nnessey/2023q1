import './style.css';
import 'highlight.js/styles/github.css';
import hljs from 'highlight.js/lib/core';
import css from 'highlight.js/lib/languages/css';

import classNames from '../../../../classNames';
import { BaseComponent } from '../../../baseComponent/BaseComponent';
import { Store } from '../../../../store/Store';

hljs.registerLanguage('css', css);

export class CssEditorTextInput extends BaseComponent {
  private code: BaseComponent;
  private textArea: BaseComponent;

  constructor(parent: BaseComponent) {
    super({
      classNames: ['css-editor__text-inputs'],
      parent,
    });

    this.textArea = new BaseComponent({
      tagName: 'textarea',
      classNames: [classNames.cssEditor.textInput],
      parent: this,
    });

    this.textArea.setAttribute('rows', '1');

    this.code = new BaseComponent({
      classNames: [classNames.cssEditor.textInput + '_highlight', 'code', 'language-css'],
      parent: this,
    });

    this.code.setAttribute('id', 'css-hljs');

    this.setAttribute('type', 'text');

    this.addEventListener('input', () => {
      const node = this.textArea.node as HTMLTextAreaElement;
      this.code.setTextContent(node.value);
      hljs.highlightElement(this.code.node);
    });

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
