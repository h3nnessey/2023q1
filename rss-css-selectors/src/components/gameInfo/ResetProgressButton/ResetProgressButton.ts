import './style.css';
import { BaseComponent } from '../../baseComponent/BaseComponent';
import { Store } from '../../../store';

export class ResetProgressButton extends BaseComponent {
  constructor(parent: BaseComponent) {
    super({ tagName: 'button', classNames: ['reset-progress'], parent, html: '<span>Reset Progress</span>' });
    this.addEventListener('click', () => {
      const newStartId = 0;

      Store.resetProgress(newStartId);

      Store.app.node.dispatchEvent(
        new CustomEvent('rerender', {
          detail: {
            level: Store.levels[newStartId],
          },
        })
      );
    });
  }
}
