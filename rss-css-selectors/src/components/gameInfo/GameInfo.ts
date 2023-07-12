import './style.css';
import { BaseComponent } from '../baseComponent/BaseComponent';
import { Store } from '../../store';
import { LevelSelectorToggle } from '../lessonSelector/levelSelectorToggler/LevelSelectorToggle';
import { ChangeLessonButtons } from './changeLessonButtons/ChangeLessonButtons';
import { GameInfoLessonState } from './gameInfoLessonState/GameInfoLessonState';

export class GameInfo extends BaseComponent {
  private readonly gameInfoRow: BaseComponent;
  private readonly changeLessonButtons: ChangeLessonButtons;
  private readonly gameInfoLessonState: GameInfoLessonState;
  private lessonNumber: BaseComponent;
  private title: BaseComponent;
  private subtitle: BaseComponent;
  private selector: BaseComponent;
  private description: BaseComponent;
  private example: BaseComponent;
  public levelSelectorToggle: LevelSelectorToggle;

  constructor(parent: BaseComponent) {
    super({ classNames: ['game-info'], parent });

    this.gameInfoRow = new BaseComponent({ classNames: ['game-info__row'], parent: this });

    this.lessonNumber = new BaseComponent({
      tagName: 'p',
      classNames: ['game-info__lesson-number'],
      parent: this.gameInfoRow,
      html: `Lesson ${Store.currentLevel.id + 1} of ${Store.levels.length}`,
    });

    this.gameInfoLessonState = new GameInfoLessonState(this.gameInfoRow);

    this.changeLessonButtons = new ChangeLessonButtons(this.gameInfoRow);

    this.levelSelectorToggle = new LevelSelectorToggle(this.gameInfoRow);

    this.title = new BaseComponent({
      tagName: 'h2',
      classNames: ['game-info__title'],
      parent: this,
      text: Store.currentLevel.title,
    });

    this.subtitle = new BaseComponent({
      tagName: 'h3',
      classNames: ['game-info__subtitle'],
      parent: this,
      text: Store.currentLevel.subtitle,
    });

    this.selector = new BaseComponent({
      tagName: 'p',
      classNames: ['game-info__selector'],
      parent: this,
      html: `Syntax: ${Store.currentLevel.selector}`,
    });

    this.description = new BaseComponent({
      tagName: 'p',
      classNames: ['game-info__description'],
      parent: this,
      html: Store.currentLevel.description,
    });

    this.example = new BaseComponent({
      tagName: 'p',
      classNames: ['game-info__example'],
      parent: this,
      html: Store.currentLevel.example,
    });
  }

  public render(): void {
    this.lessonNumber.setHtml(`Lesson ${Store.currentLevel.id + 1} of ${Store.levels.length}`);
    this.gameInfoLessonState.render();
    this.title.setTextContent(Store.currentLevel.title);
    this.subtitle.setTextContent(Store.currentLevel.subtitle);
    this.selector.setHtml(`Syntax: ${Store.currentLevel.selector}`);
    this.description.setHtml(Store.currentLevel.description);
    this.example.setHtml(Store.currentLevel.example);
    this.levelSelectorToggle.removeClass('opened');
  }
}
