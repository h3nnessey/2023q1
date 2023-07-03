import './style.css';
import 'highlight.js/styles/github.css';
import hljs from 'highlight.js/lib/core';
import css from 'highlight.js/lib/languages/css';

import classNames from '../../../../classNames';
import { BaseComponent } from '../../../baseComponent/BaseComponent';
import { Store } from '../../../../store/Store';

hljs.registerLanguage('css', css);

export class CssEditorTextInput extends BaseComponent {
  public code: BaseComponent;
  public input: BaseComponent;

  constructor(parent: BaseComponent) {
    super({
      classNames: ['css-editor__text-inputs'],
      parent,
    });

    this.input = new BaseComponent({
      tagName: 'input',
      classNames: [classNames.cssEditor.textInput],
      parent: this,
    });

    this.input.setAttribute('placeholder', 'Write a css selector...');

    this.code = new BaseComponent({
      classNames: [classNames.cssEditor.textInput + '_highlight', 'code', 'language-css'],
      parent: this,
    });

    this.code.setAttribute('id', 'css-hljs');

    this.setAttribute('type', 'text');

    this.input.addEventListener('input', () => {
      const node = this.input.node as HTMLInputElement;
      this.code.setTextContent(node.value);
      hljs.highlightElement(this.code.node);
    });

    this.input.addEventListener('keydown', (event: Event) => {
      // add prevent cheating handlers (like select .target)
      if (event instanceof KeyboardEvent && event.key === 'Enter') {
        try {
          const node = this.input.node as HTMLInputElement;

          const selected = Store.cardsTable.node.querySelectorAll(`${node.value.trim()}`);

          let answer = '';

          Array.from(selected).forEach((el) => {
            answer += el.outerHTML;
          });

          const isWin = answer === Store.currentLessonAnswer;

          if (isWin) {
            Store.cardsTable.node.dispatchEvent(new CustomEvent('win'));
            Store.completed.push(Store.currentLesson.id);
            node.value = '';
            this.code.setTextContent('');
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
