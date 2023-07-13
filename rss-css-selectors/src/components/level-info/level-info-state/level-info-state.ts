import './style.css';
import { classNames } from '../class-names';
import { BaseComponent } from '../../base-component/base-component';
import { Store } from '../../../store';

export class LevelInfoState extends BaseComponent {
  constructor(parent: BaseComponent) {
    super({
      classNames: [classNames.levelInfoState],
      parent,
      html: `<span class="${classNames.checkmarkIcon}"></span><span class="${classNames.helpIcon}"></span>`,
    });

    const id = Store.currentLevel.id;

    if (Store.completed.includes(id)) this.addClass(classNames.levelCompleted);
    if (Store.helped.includes(id)) this.addClass(classNames.levelHelped);
  }

  public render() {
    this.removeClass(classNames.levelCompleted);
    this.removeClass(classNames.levelHelped);

    const id = Store.currentLevel.id;

    if (Store.completed.includes(id)) this.addClass(classNames.levelCompleted);
    if (Store.helped.includes(id)) this.addClass(classNames.levelHelped);
  }
}
