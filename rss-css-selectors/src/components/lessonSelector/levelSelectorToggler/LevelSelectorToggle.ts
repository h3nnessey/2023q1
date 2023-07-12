import './style.css';
import { BaseComponent } from '../../baseComponent/BaseComponent';
import { Store } from '../../../store';

export class LevelSelectorToggle extends BaseComponent {
  constructor(parent: BaseComponent) {
    super({
      tagName: 'button',
      classNames: ['level-selector__toggle'],
      parent,
      text: '⫼',
    });

    this.addEventListener('click', (event: Event) => {
      if (event instanceof MouseEvent) {
        Store.levelSelector.node.classList.toggle('hidden');
      }
    });
  }
}
