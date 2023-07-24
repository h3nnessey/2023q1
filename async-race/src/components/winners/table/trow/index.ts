import { Component } from '../../../component';
import { CarWinner } from '../../../../types';
import { svgContent } from '../../../../data/svg-content';
import { GarageService } from '../../../../services/garage.service';

export class Trow extends Component {
  private readonly number: Component;
  private readonly car: Component;
  private readonly name: Component;
  private readonly wins: Component;
  private readonly bestTime: Component;

  constructor(public readonly index: number, winner: CarWinner, parent: Component) {
    super({ classNames: ['winners-table__row'], parent });

    this.number = new Component({ text: index.toString(), classNames: ['winners-table__number'], parent: this });
    this.car = new Component({ html: svgContent, classNames: ['winners-table__car-img'], parent: this });
    this.name = new Component({ text: '-', parent: this, classNames: ['winners-table__name'] });
    this.wins = new Component({ text: `${winner.wins}`, classNames: ['winners-table__wins'], parent: this });
    this.bestTime = new Component({ text: `${winner.time}s`, classNames: ['winners-table__time'], parent: this });

    GarageService.getCar(winner.id).then((car) => {
      this.car.node.style.fill = car.color;
      this.name.setTextContent(car.name);
    });
  }
}
