import { BaseComponent } from '../../../base-component/base-component';
import { classNames } from '../../class-names';
import { Store } from '../../../../store';
import { setLocalStorage } from '../../../../local-storage';
import {GameState} from "../../../../types";

export class LevelChangerPrev extends BaseComponent {
  constructor(parent: BaseComponent) {
    super({
      tagName: 'button',
      classNames: [classNames.levelChangersPrev],
      parent,
      html: '<span>⬅</span>',
    });

    this.addEventListener('click', (event: Event) => {
      if (event instanceof MouseEvent) {
        const id = Store.currentLevel.id === 0 ? Store.levels.length - 1 : Store.currentLevel.id - 1;

        setLocalStorage<GameState>({
          current: id,
          completed: Store.completed,
          helped: Store.helped,
        });

        Store.app.node.dispatchEvent(
          new CustomEvent('rerender', {
            detail: {
              level: Store.levels.find((level) => level.id === id),
            },
          })
        );
      }
    });
  }
}
