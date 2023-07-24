import { Component } from '../component';
import { Store } from '../../store';

export class Modal extends Component {
  constructor(parent: Component) {
    super({ classNames: ['modal'], parent });

    Store.modal = this;
  }

  public show(name: string, time: number): void {
    this.setTextContent(`${name} finished first in ${time} seconds!`);
    this.removeClass('modal-hidden');
  }

  public hide(): void {
    this.addClass('modal-hidden');
    this.setTextContent('');
  }
}
