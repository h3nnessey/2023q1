import './style.css';
import { classNames } from '../../class-names';
import 'highlight.js/styles/github.css';
import hljs from 'highlight.js/lib/core';
import css from 'highlight.js/lib/languages/css';
import { BaseComponent } from '../../../base-component/base-component';
import { Store } from '../../../../store';
import { Controls } from '../controls';

hljs.registerLanguage('css', css);

export class SelectorInput extends BaseComponent {
  public readonly input: BaseComponent;
  public readonly highlightedInput: BaseComponent;
  private readonly inputNode: HTMLInputElement;
  private readonly controls: Controls;

  constructor(controls: Controls) {
    super({
      classNames: [classNames.selector],
      parent: controls,
    });

    this.controls = controls;

    this.input = new BaseComponent({
      tagName: 'input',
      classNames: [classNames.selectorInput],
      parent: this,
    });

    this.inputNode = this.input.node as HTMLInputElement;

    this.input.setAttribute('placeholder', 'Write a CSS selector...');

    this.highlightedInput = new BaseComponent({
      classNames: [classNames.highlightedSelector, classNames.code, classNames.languageCss],
      parent: this,
    });

    this.highlightedInput.setAttribute('id', classNames.highlightedSelectorId);

    this.input.addEventListener('input', () => this.handleInput());
    this.input.addEventListener('keydown', (event: Event) => this.handleKeydown(event));
  }

  private handleInput(): void {
    this.highlightedInput.setTextContent(this.inputNode.value);
    hljs.highlightElement(this.highlightedInput.node);
  }

  private handleKeydown(event: Event): void {
    if (event instanceof KeyboardEvent && event.key === 'Enter') {
      this.controls.checkAnswer();
    }
  }

  public handleHelp(): void {
    const answer = Store.currentLevel.help;

    this.input.setTextContent('');
    this.highlightedInput.setTextContent('');

    [...answer].forEach((char, index) => {
      setTimeout(() => {
        this.inputNode.disabled = true;
        this.inputNode.value += answer[index];
        this.highlightedInput.setTextContent(this.inputNode.value);
        hljs.highlightElement(this.highlightedInput.node);
        this.input.node.focus();
        this.inputNode.disabled = false;
      }, index * 100);
    });
  }
}
