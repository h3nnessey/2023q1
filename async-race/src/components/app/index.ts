import { Component } from '../component';
import { ViewChangers } from '../view-changers';
import { Garage } from '../garage';

export class App extends Component {
  private readonly viewChangers: ViewChangers;
  private readonly garage: Garage;

  constructor(private readonly container: HTMLElement) {
    super({ tagName: 'main', classNames: ['app'] });

    this.viewChangers = new ViewChangers(this);
    this.garage = new Garage(this);
  }

  public render(): void {
    this.container.appendChild(this.node);
  }
}
