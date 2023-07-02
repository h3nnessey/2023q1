import './style.css';
import { BaseComponent } from '../../baseComponent/BaseComponent';
import { Store } from '../../../store/Store';
import { Lesson } from '../../../types';

export class LessonSelectorElement extends BaseComponent {
  private readonly lesson: Lesson;

  constructor(
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

    if (this.id === Store.currentLesson.id) this.addClass('current');

    this.addEventListener('click', (event: Event) => {
      if (event instanceof MouseEvent) {
        this.lessonSelectorElements.forEach((element) => element.removeClass('current'));
        Store.levelSelector.addClass('hidden');
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
