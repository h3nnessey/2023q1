import './style.css';
import { classNames } from '../class-names';
import { BaseComponent } from '../../base-component/base-component';
import { LevelInfo } from '../level-info';

export class LevelInfoToggle extends BaseComponent {
  private readonly shouldHideLevelInfo: boolean;
  private readonly levelInfo: LevelInfo;

  constructor(levelInfo: LevelInfo) {
    super({ tagName: 'button', classNames: [classNames.levelInfoToggle], html: '<span>|||</span>' });

    this.shouldHideLevelInfo = window.matchMedia('(max-width: 1100px').matches;
    this.levelInfo = levelInfo;

    if (this.shouldHideLevelInfo) this.levelInfo.addClass(classNames.levelInfoHidden);

    this.addEventListener('click', (event: Event) => {
      if (event instanceof MouseEvent) {
        if (this.levelInfo.node.classList.contains(classNames.levelInfoHidden)) {
          this.levelInfo.node.classList.remove(classNames.levelInfoHidden);
        } else {
          this.levelInfo.node.classList.add(classNames.levelInfoHidden);
        }
      }
    });
  }
}
