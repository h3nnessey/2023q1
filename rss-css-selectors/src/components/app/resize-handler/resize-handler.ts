import { classNames as levelInfoClassNames } from '../../level-info/class-names';
import { classNames as levelSelectorClassNames } from '../../level-selector/class-names';
import { ASIDE_MAX_WIDTH } from '../../../constants';
import { LevelInfo } from '../../level-info/level-info';
import { LevelSelector } from '../../level-selector/level-selector';

export class ResizeHandler {
  constructor(private readonly levelInfo: LevelInfo, private readonly levelSelector: LevelSelector) {
    window.addEventListener('resize', (event: Event) => this.handleWindowResize(event));
  }

  private handleWindowResize(event: Event): void {
    const target = event.target as Window;
    const targetWidth = target.screen.width;

    if (targetWidth <= ASIDE_MAX_WIDTH) {
      if (!this.levelInfo.node.classList.contains(levelInfoClassNames.levelInfoHidden)) {
        this.levelInfo.node.classList.add(levelInfoClassNames.levelInfoHidden);
        this.levelSelector.node.classList.add(levelSelectorClassNames.levelSelectorHidden);
      }
    } else {
      this.levelInfo.node.classList.remove(levelInfoClassNames.levelInfoHidden);
    }
  }
}
