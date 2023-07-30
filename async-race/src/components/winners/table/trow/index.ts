import { Component } from '../../../component';
import { CarWinner } from '../../../../types';
import { GarageService } from '../../../../services/garage.service';
import content from '../../../../assets/car.svg';
import classes from './styles.module.css';

export class Trow extends Component {
  private readonly number: Component;
  private readonly car: Component;
  private readonly name: Component;
  private readonly wins: Component;
  private readonly bestTime: Component;

  constructor(public readonly index: number, winner: CarWinner, parent: Component) {
    super({ classNames: [classes.winnersTableRow], parent });

    this.number = new Component({ text: index.toString(), classNames: [classes.winnersTableNumber], parent: this });
    this.car = new Component({ html: content, classNames: [classes.winnersTableCarImg], parent: this });
    this.name = new Component({ text: '-', parent: this, classNames: [classes.winnersTableName] });
    this.wins = new Component({ text: `${winner.wins}`, classNames: [classes.winnersTableWins], parent: this });
    this.bestTime = new Component({ text: `${winner.time}s`, classNames: [classes.winnersTableTime], parent: this });

    GarageService.getCar(winner.id).then((car) => {
      this.car.node.style.fill = car.color;
      this.name.setTextContent(car.name);
    });
  }
}
