import { Component } from '../../../component';
import { Car } from './car';
import { ICar } from '../../../../types';

export class CarTrack extends Component {
  public readonly car: Car;

  constructor({ parent, carInfo }: { parent: Component; carInfo: ICar }) {
    super({ classNames: ['garage__car-track'], parent });

    this.car = new Car(this, carInfo);
  }
}
