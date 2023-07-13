import './style.css';
import { classNames } from './class-names';
import { BaseComponent } from '../base-component/base-component';
import { Store } from '../../store';

export class LevelTarget extends BaseComponent {
  private readonly title: BaseComponent;

  constructor() {
    super({ classNames: [classNames.target] });

    this.title = new BaseComponent({
      tagName: 'h1',
      classNames: [classNames.title],
      text: Store.currentLevel.target,
      parent: this,
    });
  }

  public rerender(): void {
    this.title.setTextContent(Store.currentLevel.target);
  }
}
