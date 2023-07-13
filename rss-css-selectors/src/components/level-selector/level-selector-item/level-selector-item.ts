import './style.css';
import { classNames } from '../class-names';
import { classNames as levelInfoClassNames } from '../../level-info/class-names';
import { ASIDE_MAX_WIDTH } from '../../../constants';
import { BaseComponent } from '../../base-component/base-component';
import { Store } from '../../../store';
import { GameState, Level } from '../../../types';
import { setLocalStorage } from '../../../local-storage';

export class LevelSelectorItem extends BaseComponent {
  private readonly level: Level;

  constructor(public readonly id: number, parent: BaseComponent) {
    super({ tagName: 'li', classNames: [classNames.levelSelectorItem], parent });

    this.level = Store.levels.find((level) => level.id === id)!;

    new BaseComponent({
      tagName: 'span',
      classNames: [classNames.levelSelectorItemTitle],
      parent: this,
      html: `${id + 1}. ${this.level.title}: ${this.level.selector}`,
    });

    this.addEventListener('click', (event: Event) => {
      if (event instanceof MouseEvent) {
        const shouldBeHidden = window.matchMedia(`(max-width: ${ASIDE_MAX_WIDTH}px`).matches;

        if (shouldBeHidden) Store.app.levelInfo.node.classList.toggle(levelInfoClassNames.levelInfoHidden);

        Store.levelSelector.addClass(classNames.levelSelectorHidden);

        const newLevel = Store.levels.find((level) => level.id === this.id)!;

        setLocalStorage<GameState>({
          current: newLevel.id,
          completed: Store.completed,
          helped: Store.helped,
        });

        Store.app.node.dispatchEvent(
          new CustomEvent('rerender', {
            detail: {
              level: newLevel,
            },
          })
        );
      }
    });
  }
}
