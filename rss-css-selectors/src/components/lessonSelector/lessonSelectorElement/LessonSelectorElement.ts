import './style.css';
import { BaseComponent } from '../../baseComponent/BaseComponent';
import { Store } from '../../../store/Store';

export class LessonSelectorElement extends BaseComponent {
  constructor(private readonly id: number, parent: BaseComponent) {
    super({ tagName: 'li', classNames: ['lesson-selector__item'], parent, text: id.toString() });

    this.addEventListener('click', (event: Event) => {
      if (event instanceof MouseEvent) {
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
