import { LevelInfo } from '../../level-info/level-info';
import { LevelSelector } from '../../level-selector/level-selector';
import { ASIDE_MAX_WIDTH } from '../../../constants';

export class ResizeHandler {
  constructor(private readonly levelInfo: LevelInfo, private readonly levelSelector: LevelSelector) {
    window.addEventListener('resize', (event: Event) => {
      const target = event.target as Window;
      const targetWidth = target.screen.width;

      if (targetWidth <= ASIDE_MAX_WIDTH) {
        if (this.levelInfo.node.classList.contains('hidden')) {
          return null;
        } else {
          this.levelInfo.node.classList.add('hidden');
          this.levelSelector.node.classList.add('hidden');
        }
      } else this.levelInfo.node.classList.remove('hidden');
    });
  }
}
