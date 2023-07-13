import './style.css';
import { classNames } from './class-names';
import { BaseComponent } from '../base-component/base-component';
import { Store } from '../../store';
import { LevelSelectorItem } from './level-selector-item/level-selector-item';
import { ResetProgress } from './reset-progress/reset-progress';

export class LevelSelector extends BaseComponent {
  private items: LevelSelectorItem[] = [];
  private readonly resetProgressBtn: ResetProgress;

  constructor() {
    super({ tagName: 'ul', classNames: [classNames.levelSelector, classNames.levelSelectorHidden] });

    new BaseComponent({
      tagName: 'p',
      classNames: [classNames.levelSelectorTitle],
      parent: this,
      text: 'Select level',
    });

    Store.levels.forEach((level) => this.items.push(new LevelSelectorItem(level.id, this)));

    this.resetProgressBtn = new ResetProgress(this);
  }

  public render() {
    this.items.forEach((item) => {
      item.removeClass(classNames.current);
      item.removeClass(classNames.completed);
      item.removeClass(classNames.helped);

      if (Store.completed.includes(item.id)) item.addClass(classNames.completed);
      if (Store.helped.includes(item.id)) item.addClass(classNames.helped);
      if (item.id === Store.currentLevel.id) item.addClass(classNames.current);
    });
  }
}
