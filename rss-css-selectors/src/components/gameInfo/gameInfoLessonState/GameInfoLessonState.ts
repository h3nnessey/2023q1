import './style.css';
import { BaseComponent } from '../../baseComponent/BaseComponent';
import { Store } from '../../../store';

export class GameInfoLessonState extends BaseComponent {
  constructor(parent: BaseComponent) {
    super({
      classNames: ['game-info__state'],
      parent,
      html: '<span class="checkmark-icon"></span><span class="help-icon"></span>',
    });

    const id = Store.currentLevel.id;

    if (Store.completed.includes(id)) this.addClass('completed');
    if (Store.helped.includes(id)) this.addClass('help-used');
  }

  public render() {
    this.removeClass('completed');
    this.removeClass('help-used');

    const id = Store.currentLevel.id;

    if (Store.completed.includes(id)) this.addClass('completed');
    if (Store.helped.includes(id)) this.addClass('help-used');
  }
}
