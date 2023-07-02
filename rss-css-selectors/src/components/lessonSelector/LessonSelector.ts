import './style.css';
import { BaseComponent } from '../baseComponent/BaseComponent';
import { Store } from '../../store/Store';
import { LessonSelectorElement } from './lessonSelectorElement/LessonSelectorElement';

export class LessonSelector extends BaseComponent {
  private elements: LessonSelectorElement[] = [];

  constructor() {
    super({ tagName: 'ul', classNames: ['lesson-selector'] });

    Store.lessons.forEach((lesson) => {
      const element = new LessonSelectorElement(lesson.id, this.elements, this);
      this.elements.push(element);
    });
  }
}
