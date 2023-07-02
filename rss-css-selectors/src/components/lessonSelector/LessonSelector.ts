import './style.css';
import { BaseComponent } from '../baseComponent/BaseComponent';
import { Store } from '../../store/Store';
import { LessonSelectorElement } from './lessonSelectorElement/LessonSelectorElement';

export class LessonSelector extends BaseComponent {
  private elements: LessonSelectorElement[] = [];

  constructor(parent: BaseComponent) {
    super({ tagName: 'ul', classNames: ['lesson-selector', 'hidden'], parent });

    new BaseComponent({ tagName: 'p', classNames: ['lesson-selector__title'], parent: this, text: 'Select level' });

    Store.lessons.forEach((lesson) => {
      const element = new LessonSelectorElement(lesson.id, this.elements, this);

      this.elements.push(element);
    });
  }

  public rerender() {
    this.elements.forEach((element) => {
      if (element.id === Store.currentLesson.id) {
        element.addClass('current');
      } else {
        element.removeClass('current');
      }
    });
  }
}
