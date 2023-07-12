import './style.css';
import { BaseComponent } from '../baseComponent/BaseComponent';
import { Store } from '../../store';

export class LessonTarget extends BaseComponent {
  private readonly heading: BaseComponent;

  constructor(parent: BaseComponent) {
    super({ classNames: ['lesson-target'], parent });
    this.heading = new BaseComponent({
      tagName: 'h1',
      classNames: ['lesson-target__title'],
      text: Store.currentLevel.target,
      parent: this,
    });
  }

  public rerender() {
    this.heading.setTextContent(Store.currentLevel.target);
  }
}
