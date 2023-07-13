import './style.css';
import { classNames } from '../class-names';
import { BaseComponent } from '../../base-component/base-component';
import { Store } from '../../../store';

export class LevelSelectorToggle extends BaseComponent {
  constructor(parent: BaseComponent) {
    super({
      tagName: 'button',
      classNames: [classNames.levelSelectorToggle],
      parent,
      text: '⫼',
    });

    this.addEventListener('click', () => this.handleClick());
  }

  private handleClick(): void {
    Store.levelSelector.node.classList.toggle(classNames.levelSelectorHidden);
  }
}
