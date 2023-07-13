import { BaseComponent } from '../../../base-component/base-component';
import { classNames } from '../../class-names';
import { Store } from '../../../../store';

export class LevelChangerNext extends BaseComponent {
  constructor(parent: BaseComponent) {
    super({
      tagName: 'button',
      classNames: [classNames.levelChangersNext],
      parent,
      html: '<span>➡</span>',
    });

    this.addEventListener('click', () => this.handleClick());
  }

  private handleClick(): void {
    const id = Store.currentLevel.id === Store.levels.length - 1 ? 0 : Store.currentLevel.id + 1;

    Store.saveGameState({
      current: id,
    });

    Store.app.node.dispatchEvent(
      new CustomEvent('rerender', {
        detail: {
          level: Store.levels.find((level) => level.id === id),
        },
      })
    );
  }
}
