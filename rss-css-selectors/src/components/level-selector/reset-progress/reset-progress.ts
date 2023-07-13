import './style.css';
import { classNames } from '../class-names';
import { BaseComponent } from '../../base-component/base-component';
import { Store } from '../../../store';

export class ResetProgress extends BaseComponent {
  constructor(parent: BaseComponent) {
    super({ tagName: 'button', classNames: [classNames.resetProgress], parent, html: '<span>Reset Progress</span>' });

    this.addEventListener('click', () => this.handleClick());
  }

  private handleClick(): void {
    const startId = 0;

    Store.resetProgress(startId);

    Store.app.node.dispatchEvent(
      new CustomEvent('rerender', {
        detail: {
          level: Store.levels[startId],
        },
      })
    );
  }
}
