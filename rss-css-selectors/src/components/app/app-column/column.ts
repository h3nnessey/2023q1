import { BaseComponent } from '../../base-component/base-component';
import { classNames } from '../class-names';
import { classNames as levelInfoClassNames } from '../../level-info/class-names';
import { LevelInfo } from '../../level-info/level-info';
import { LevelSelector } from '../../level-selector/level-selector';

export class Column extends BaseComponent {
  constructor(
    parent: BaseComponent,
    private readonly levelInfo?: LevelInfo,
    private readonly levelSelector?: LevelSelector
  ) {
    super({ classNames: [classNames.column], parent });

    if (levelInfo && levelSelector) {
      this.addEventListener('click', (event: Event) => {
        if (event instanceof MouseEvent) {
          const target = event.target as HTMLElement;
          if (target.classList.contains(classNames.column)) {
            levelInfo.node.classList.toggle(levelInfoClassNames.levelInfoHidden);
            levelSelector.node.classList.add(levelInfoClassNames.levelInfoHidden);
          }
        }
      });
    }
  }
}
