import './style.css';
import { BaseComponent } from '../../baseComponent/BaseComponent';
import { Store } from '../../../store/Store';
import { Lesson } from '../../../types';
import { setLocalStorage } from '../../../localStorage';

export class LessonSelectorElement extends BaseComponent {
  private readonly lesson: Lesson;

  constructor(
    public readonly completed: boolean,
    public readonly id: number,
    private readonly lessonSelectorElements: BaseComponent[],
    parent: BaseComponent
  ) {
    super({ tagName: 'li', classNames: ['lesson-selector__item'], parent });

    this.lesson = Store.lessons.find((lesson) => lesson.id === id)!;

    new BaseComponent({
      tagName: 'span',
      classNames: ['lesson-selector__item_text'],
      parent: this,
      html: `${id + 1}. ${this.lesson.title}: ${this.lesson.selector}`,
    });

    this.addEventListener('click', (event: Event) => {
      if (event instanceof MouseEvent) {
        Store.levelSelector.addClass('hidden');

        const selectedLesson = Store.lessons.find((lesson) => lesson.id === this.id)!;

        setLocalStorage({
          current: selectedLesson.id,
          completed: Store.completed,
          helped: [],
        });

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
