import './style.css';
import { classNames } from '../class-names';
import { BaseComponent } from '../../base-component/base-component';
import { LevelChangerNext } from './level-changer-next/level-changer-next';
import { LevelChangerPrev } from './level-changer-prev/level-changer-prev';

export class LevelChangers extends BaseComponent {
  private readonly prevButton: LevelChangerPrev;
  private readonly nextButton: LevelChangerNext;

  constructor(parent: BaseComponent) {
    super({
      classNames: [classNames.levelChangers],
      parent,
    });

    this.prevButton = new LevelChangerPrev(this);
    this.nextButton = new LevelChangerNext(this);
  }
}
