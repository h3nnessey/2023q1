import './style.css';
import { BaseComponent } from '../baseComponent/BaseComponent';
import { Store } from '../../store/Store';

export class GameInfo extends BaseComponent {
  private title: BaseComponent;
  private subtitle: BaseComponent;
  private selector: BaseComponent;
  private example: BaseComponent;

  constructor(parent: BaseComponent) {
    super({ classNames: ['game-info'], parent });

    this.title = new BaseComponent({
      tagName: 'h1',
      classNames: ['game-info__title'],
      parent: this,
      text: Store.currentLesson.title,
    });

    this.subtitle = new BaseComponent({
      tagName: 'h1',
      classNames: ['game-info__subtitle'],
      parent: this,
      text: Store.currentLesson.subtitle,
    });

    this.selector = new BaseComponent({
      tagName: 'h1',
      classNames: ['game-info__selector'],
      parent: this,
      text: Store.currentLesson.selector,
    });

    this.example = new BaseComponent({
      tagName: 'h1',
      classNames: ['game-info__example'],
      parent: this,
      text: Store.currentLesson.example,
    });
  }

  public render(): void {
    this.title.setTextContent(Store.currentLesson.title);
    this.subtitle.setTextContent(Store.currentLesson.subtitle);
    this.selector.setTextContent(Store.currentLesson.selector);
    this.example.setTextContent(Store.currentLesson.example);
  }
}
