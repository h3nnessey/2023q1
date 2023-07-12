import './style.css';
import { BaseComponent } from '../../baseComponent/BaseComponent';
import { Store } from '../../../store';
import { Level } from '../../../types';
import { setLocalStorage } from '../../../localStorage';

export class LessonSelectorElement extends BaseComponent {
  private readonly level: Level;

  constructor(
    private readonly completed: boolean,
    private readonly helped: boolean,
    public readonly id: number,
    private readonly lessonSelectorElements: BaseComponent[],
    parent: BaseComponent
  ) {
    super({ tagName: 'li', classNames: ['lesson-selector__item'], parent });

    if (completed) this.addClass('completed');
    if (helped) this.addClass('helped');

    this.level = Store.levels.find((level) => level.id === id)!;

    new BaseComponent({
      tagName: 'span',
      classNames: ['lesson-selector__item_text'],
      parent: this,
      html: `${id + 1}. ${this.level.title}: ${this.level.selector}`,
    });

    this.addEventListener('click', (event: Event) => {
      if (event instanceof MouseEvent) {
        console.log(Store);
        const shouldBeHidden = window.matchMedia('(max-width: 1100px').matches;

        if (shouldBeHidden) Store.app.gameInfo.node.classList.toggle('hidden');

        Store.levelSelector.addClass('hidden');

        const newLevel = Store.levels.find((level) => level.id === this.id)!;

        setLocalStorage({
          current: newLevel.id,
          completed: Store.completed,
          helped: Store.helped,
        });

        Store.app.node.dispatchEvent(
          new CustomEvent('rerender', {
            detail: {
              level: newLevel,
            },
          })
        );
      }
    });
  }
}
