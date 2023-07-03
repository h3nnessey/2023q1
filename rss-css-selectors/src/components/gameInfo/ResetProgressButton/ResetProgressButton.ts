import './style.css';
import { BaseComponent } from '../../baseComponent/BaseComponent';
import { Store } from '../../../store/Store';

export class ResetProgressButton extends BaseComponent {
  constructor(parent: BaseComponent) {
    super({ tagName: 'button', classNames: ['reset-progress'], parent, html: '<span>🔃</span>' });
    this.addEventListener('click', () => {
      const newStartId = 0;

      Store.resetCompleted(newStartId);
      Store.app.node.dispatchEvent(
        new CustomEvent('rerender', {
          detail: {
            lesson: Store.lessons[newStartId],
          },
        })
      );
    });
  }
}
