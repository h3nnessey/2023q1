import './style.css';
import { BaseComponent } from '../baseComponent/BaseComponent';
import { Store } from '../../store/Store';
import { LevelSelectorToggle } from '../lessonSelector/levelSelectorToggler/LevelSelectorToggle';

export class GameInfo extends BaseComponent {
  private readonly gameInfoRow: BaseComponent;
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
      html: `<span>Lesson ${Store.currentLesson.id + 1} of ${Store.lessons.length}</span>`,
    });

    this.levelSelectorToggle = new LevelSelectorToggle(this.gameInfoRow);

    this.title = new BaseComponent({
      tagName: 'h2',
      classNames: ['game-info__title'],
      parent: this,
      text: Store.currentLesson.title,
    });

    this.subtitle = new BaseComponent({
      tagName: 'h3',
      classNames: ['game-info__subtitle'],
      parent: this,
      text: Store.currentLesson.subtitle,
    });

    this.selector = new BaseComponent({
      tagName: 'p',
      classNames: ['game-info__selector'],
      parent: this,
      html: `Syntax: ${Store.currentLesson.selector}`,
    });

    this.description = new BaseComponent({
      tagName: 'p',
      classNames: ['game-info__description'],
      parent: this,
      html: Store.currentLesson.description,
    });

    this.example = new BaseComponent({
      tagName: 'p',
      classNames: ['game-info__example'],
      parent: this,
      html: Store.currentLesson.example,
    });
  }

  public render(): void {
    this.lessonNumber.setHtml(`Lesson ${Store.currentLesson.id + 1} of ${Store.lessons.length}`);
    this.title.setTextContent(Store.currentLesson.title);
    this.subtitle.setTextContent(Store.currentLesson.subtitle);
    this.selector.setHtml(`Syntax: ${Store.currentLesson.selector}`);
    this.description.setHtml(Store.currentLesson.description);
    this.example.setHtml(Store.currentLesson.example);
    this.levelSelectorToggle.removeClass('opened');
  }
}
