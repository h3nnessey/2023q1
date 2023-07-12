import './style.css';
import { BaseComponent } from '../../baseComponent/BaseComponent';
import { Store } from '../../../store';
import { setLocalStorage } from '../../../localStorage';

export class ChangeLessonButtons extends BaseComponent {
  private readonly prevButton: BaseComponent;
  private readonly nextButton: BaseComponent;

  constructor(parent: BaseComponent) {
    super({
      classNames: ['lesson-changers'],
      parent,
    });

    this.prevButton = new BaseComponent({
      tagName: 'button',
      classNames: ['prev-btn'],
      parent: this,
      html: '<span>⬅</span>',
    });

    this.nextButton = new BaseComponent({
      tagName: 'button',
      classNames: ['next-btn'],
      parent: this,
      html: '<span>➡</span>',
    });

    this.nextButton.addEventListener('click', (event: Event) => {
      if (event instanceof MouseEvent) {
        const id = Store.currentLevel.id === Store.levels.length - 1 ? 0 : Store.currentLevel.id + 1;

        setLocalStorage({
          current: id,
          completed: Store.completed,
          helped: Store.helped,
        });

        Store.app.node.dispatchEvent(
          new CustomEvent('rerender', {
            detail: {
              level: Store.levels.find((level) => level.id === id),
            },
          })
        );
      }
    });

    this.prevButton.addEventListener('click', (event: Event) => {
      if (event instanceof MouseEvent) {
        const id = Store.currentLevel.id === 0 ? Store.levels.length - 1 : Store.currentLevel.id - 1;

        setLocalStorage({
          current: id,
          completed: Store.completed,
          helped: Store.helped,
        });

        Store.app.node.dispatchEvent(
          new CustomEvent('rerender', {
            detail: {
              level: Store.levels.find((level) => level.id === id),
            },
          })
        );
      }
    });
  }
}
