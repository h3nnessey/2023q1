import classes from './styles.module.css';
import { Component } from '../component';
import { Store } from '../../store';

export class Modal extends Component {
  constructor(parent: Component) {
    super({ classNames: [classes.modal, classes.modalHidden], parent });

    Store.modal = this;
  }

  public show(name: string, time: number): void {
    this.setTextContent(`${name} finished first in ${time} seconds!`);
    this.removeClass(classes.modalHidden);
  }

  public hide(): void {
    this.addClass(classes.modalHidden);
    this.setTextContent('');
  }
}
