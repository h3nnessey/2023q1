import { Component } from '../../../component';
import { Car } from './car';
import { ICar } from '../../../../types';
import { Button } from '../../../button';
import { Store } from '../../../../store';
import { GarageService } from '../../../../services/garage.service';

export class CarTrack extends Component {
  public readonly car: Car;
  private readonly carTrackRow: Component;
  private readonly carName: Component;
  private readonly selectCar: Button;
  private readonly deleteCar: Button;

  constructor({ parent, carInfo }: { parent: Component; carInfo: ICar }) {
    super({ classNames: ['garage__car-track'], parent });

    this.carTrackRow = new Component({ classNames: ['car-track__row'], parent: this });

    this.selectCar = new Button({
      parent: this.carTrackRow,
      text: 'Select',
      onClick: () => Store.garage.controls.controlsUpdate.focusWith(carInfo),
    });

    this.deleteCar = new Button({
      parent: this.carTrackRow,
      text: 'Delete',
      onClick: () =>
        GarageService.deleteCar(carInfo.id).then(() => Store.updateGarage().then(() => Store.garage.update())),
    });

    this.carName = new Component({
      tagName: 'h3',
      classNames: ['car__title'],
      parent: this.carTrackRow,
      text: carInfo.name,
    });

    this.car = new Car(this, carInfo);
  }
}
