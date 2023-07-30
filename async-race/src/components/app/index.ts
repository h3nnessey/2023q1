import { Component } from '../component';
import { ViewChangers } from '../view-changers';
import { Garage } from '../garage';
import { Winners } from '../winners';
import classes from './styles.module.css';

export class App extends Component {
  private readonly viewChangers: ViewChangers;
  private readonly garage: Garage;
  private readonly winners: Winners;

  constructor(private readonly container: HTMLElement) {
    super({ tagName: 'main', classNames: [classes.app] });

    this.viewChangers = new ViewChangers();
    this.garage = new Garage();
    this.winners = new Winners();

    this.append([this.viewChangers, this.garage, this.winners]);
  }

  public render(): void {
    this.container.appendChild(this.node);
  }
}
