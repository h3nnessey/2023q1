import './style.css';
import { BaseComponent } from '../baseComponent/BaseComponent';
import { Store } from '../../store/Store';
import { LessonSelectorElement } from './lessonSelectorElement/LessonSelectorElement';

export class LessonSelector extends BaseComponent {
  private elements: LessonSelectorElement[] = [];

  constructor(parent: BaseComponent) {
    super({ tagName: 'ul', classNames: ['lesson-selector'], parent });

    Store.lessons.forEach((lesson) => {
      const element = new LessonSelectorElement(lesson.id, this);
      this.elements.push(element);
    });
  }
}
