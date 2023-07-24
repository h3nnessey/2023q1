import { Component } from '../component';
import { Store } from '../../store';

export class Winners extends Component {
  constructor(parent: Component) {
    super({ parent, text: 'WINNERS PAGE', classNames: ['winners', 'hidden'] });

    Store.winners = this;
  }
}
