import './style.css';
import { BaseComponent } from '../../baseComponent/BaseComponent';
import { Store } from '../../../store/Store';

export class LessonSelectorElement extends BaseComponent {
  constructor(
    private readonly id: number,
    private readonly lessonSelectorElements: BaseComponent[],
    parent: BaseComponent
  ) {
    super({ tagName: 'li', classNames: ['lesson-selector__item'], parent, text: id.toString() });

    this.addEventListener('click', (event: Event) => {
      if (event instanceof MouseEvent) {
        this.lessonSelectorElements.forEach((element) => element.removeClass('current'));
        this.addClass('current');

        const selectedLesson = Store.lessons.find((lesson) => lesson.id === this.id);

        Store.app.node.dispatchEvent(
          new CustomEvent('rerender', {
            detail: {
              lesson: selectedLesson,
            },
          })
        );
      }
    });
  }
}
