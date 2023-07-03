import './style.css';
import { BaseComponent } from '../../../baseComponent/BaseComponent';

export class CssEditorHelpButton extends BaseComponent {
  constructor(parent: BaseComponent) {
    super({ tagName: 'button', classNames: ['help'], parent, html: '<span>💡</span>' });
  }
}
