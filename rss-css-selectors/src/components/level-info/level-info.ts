import './style.css';
import { classNames } from './class-names';
import { classNames as levelSelectorClassNames } from '../level-selector/class-names';
import { BaseComponent } from '../base-component/base-component';
import { Store } from '../../store';
import { LevelSelectorToggle } from '../level-selector/level-selector-toggle/level-selector-toggle';
import { LevelChangers } from './level-changers/level-changers';
import { LevelInfoState } from './level-info-state/level-info-state';

export class LevelInfo extends BaseComponent {
  private readonly levelInfoRow: BaseComponent;
  private readonly levelChangers: LevelChangers;
  private readonly levelInfoState: LevelInfoState;
  private readonly levelNumber: BaseComponent;
  private readonly title: BaseComponent;
  private readonly subtitle: BaseComponent;
  private readonly selector: BaseComponent;
  private readonly description: BaseComponent;
  private readonly example: BaseComponent;
  public readonly levelSelectorToggle: LevelSelectorToggle;

  constructor() {
    super({ classNames: [classNames.levelInfo] });

    this.levelInfoRow = new BaseComponent({ classNames: [classNames.row], parent: this });

    this.levelNumber = new BaseComponent({
      tagName: 'p',
      classNames: [classNames.levelNumber],
      parent: this.levelInfoRow,
      html: `Level ${Store.currentLevel.id + 1} of ${Store.levels.length}`,
    });

    this.levelInfoState = new LevelInfoState(this.levelInfoRow);

    this.levelChangers = new LevelChangers(this.levelInfoRow);

    this.levelSelectorToggle = new LevelSelectorToggle(this.levelInfoRow);

    this.title = new BaseComponent({
      tagName: 'h2',
      classNames: [classNames.title],
      parent: this,
      text: Store.currentLevel.title,
    });

    this.subtitle = new BaseComponent({
      tagName: 'h3',
      classNames: [classNames.subtitle],
      parent: this,
      text: Store.currentLevel.subtitle,
    });

    this.selector = new BaseComponent({
      tagName: 'p',
      classNames: [classNames.selector],
      parent: this,
      html: `Syntax: ${Store.currentLevel.selector}`,
    });

    this.description = new BaseComponent({
      tagName: 'p',
      classNames: [classNames.description],
      parent: this,
      html: Store.currentLevel.description,
    });

    this.example = new BaseComponent({
      tagName: 'p',
      classNames: [classNames.example],
      parent: this,
      html: Store.currentLevel.example,
    });
  }

  public render(): void {
    this.levelNumber.setHtml(`Level ${Store.currentLevel.id + 1} of ${Store.levels.length}`);
    this.levelInfoState.render();
    this.title.setTextContent(Store.currentLevel.title);
    this.subtitle.setTextContent(Store.currentLevel.subtitle);
    this.selector.setHtml(`Syntax: ${Store.currentLevel.selector}`);
    this.description.setHtml(Store.currentLevel.description);
    this.example.setHtml(Store.currentLevel.example);
    this.levelSelectorToggle.removeClass(levelSelectorClassNames.levelSelectorOpened);
  }
}
