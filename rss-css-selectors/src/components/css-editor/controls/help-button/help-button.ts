import './style.css';
import { classNames } from '../../class-names';
import { BaseComponent } from '../../../baseComponent/BaseComponent';
import { SelectorInput } from '../selector-input/selector-input';
import { Store } from '../../../../store';

export class HelpButton extends BaseComponent {
  private readonly btnNode: HTMLButtonElement;

  constructor(parent: BaseComponent, selectorInput: SelectorInput) {
    super({
      tagName: 'button',
      classNames: [classNames.helpBtn],
      parent,
      html: `<span class="${classNames.helpBtnIcon}"></span>`,
    });

    this.btnNode = this.node as HTMLButtonElement;

    this.setAttribute('title', 'Help!');

    this.addEventListener('click', () => {
      this.off();

      Store.setHelped();
      selectorInput.handleHelp();
      Store.levelSelector.render();
      Store.app.gameInfo.render();
    });
  }

  public on(): void {
    this.btnNode.disabled = false;
  }

  public off(): void {
    this.btnNode.disabled = true;
  }
}
