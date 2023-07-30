import { Component } from '../../../component';
import { Car } from './car';
import { ICar } from '../../../../types';
import { CarControls } from './car-controls';

export class CarTrack extends Component {
  public readonly car: Car;
  public carName: Component;
  public readonly carControls: CarControls;

  private readonly firstRow: Component;
  private readonly secondRow: Component;

  constructor({ parent, carInfo }: { parent: Component; carInfo: ICar }) {
    super({ classNames: ['garage__car-track'], parent });

    this.firstRow = new Component({ classNames: ['car-track__row'], parent: this });
    this.secondRow = new Component({ classNames: ['car-track__row'], parent: this });

    this.car = new Car(this, carInfo);

    this.carName = new Component({
      tagName: 'h3',
      classNames: ['car__title'],
      text: carInfo.name,
    });

    this.carControls = new CarControls(this.car);

    this.firstRow.append([this.carControls.selectBtn, this.carControls.deleteBtn, this.carName]);

    this.secondRow.append([this.carControls.startBtn, this.carControls.resetBtn]);
  }

  public disable(): void {
    this.carControls.disable();
  }

  public enable(): void {
    this.carControls.enable();
  }
}
