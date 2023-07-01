import './style.css';
import { BaseComponent } from '../baseComponent/BaseComponent';
import { Store } from '../../store/Store';

export class GameInfo extends BaseComponent {
  private title: BaseComponent;
  private subtitle: BaseComponent;
  private selector: BaseComponent;
  private description: BaseComponent;
  private example: BaseComponent;

  constructor() {
    super({ classNames: ['game-info'] });

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
      html: Store.currentLesson.selector,
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
    this.title.setTextContent(Store.currentLesson.title);
    this.subtitle.setTextContent(Store.currentLesson.subtitle);
    this.selector.setHtml(Store.currentLesson.selector);
    this.description.setHtml(Store.currentLesson.description);
    this.example.setHtml(Store.currentLesson.example);
  }
}
