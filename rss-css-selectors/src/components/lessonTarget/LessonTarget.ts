import './style.css';
import { BaseComponent } from '../baseComponent/BaseComponent';
import { Store } from '../../store/Store';

export class LessonTarget extends BaseComponent {
  private readonly heading: BaseComponent;

  constructor(parent: BaseComponent) {
    super({ classNames: ['lesson-target'], parent });
    this.heading = new BaseComponent({
      tagName: 'h1',
      classNames: ['lesson-target__title'],
      text: Store.currentLesson.target,
      parent: this,
    });
  }

  public rerender() {
    this.heading.setTextContent(Store.currentLesson.target);
  }
}
