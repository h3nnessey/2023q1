import './style.css';
import { BaseComponent } from '../baseComponent/BaseComponent';
import { Store } from '../../store';
import { LessonSelectorElement } from './lessonSelectorElement/LessonSelectorElement';
import { ResetProgressButton } from '../gameInfo/ResetProgressButton/ResetProgressButton';

export class LessonSelector extends BaseComponent {
  private elements: LessonSelectorElement[] = [];
  private readonly resetProgressBtn: ResetProgressButton;

  constructor(parent: BaseComponent) {
    super({ tagName: 'ul', classNames: ['lesson-selector', 'hidden'], parent });

    new BaseComponent({ tagName: 'p', classNames: ['lesson-selector__title'], parent: this, text: 'Select level' });

    Store.levels.forEach((level) => {
      const isCompleted = Store.completed.includes(level.id);
      const isHelped = Store.helped.includes(level.id);

      const element = new LessonSelectorElement(isCompleted, isHelped, level.id, this.elements, this);

      this.elements.push(element);
    });

    this.resetProgressBtn = new ResetProgressButton(this);
  }

  public render() {
    this.elements.forEach((element) => {
      element.removeClass('current');
      element.removeClass('completed');
      element.removeClass('helped');

      if (Store.completed.includes(element.id)) element.addClass('completed');
      if (Store.helped.includes(element.id)) element.addClass('helped');
      if (element.id === Store.currentLevel.id) element.addClass('current');
    });
  }
}
