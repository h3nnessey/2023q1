import { Component } from '../../../component';
import { Button } from '../../../button';
import { Store } from '../../../../store';
import { getRandomCars } from '../../../../utils';
import { GarageService } from '../../../../services/garage.service';

export class ControlsRace extends Component {
  private readonly raceBtn: Button;
  private readonly resetBtn: Button;
  private readonly generateBtn: Button;

  constructor(parent: Component) {
    super({ classNames: ['garage-controls__row'], parent });

    this.raceBtn = new Button({
      parent: this,
      text: 'Race',
    });

    this.resetBtn = new Button({
      parent: this,
      text: 'Reset',
      disabled: true,
    });

    this.generateBtn = new Button({ parent: this, text: 'Generate cars' });

    this.attachListeners();
  }

  private attachListeners(): void {
    this.generateBtn.addEventListener('click', () => {
      const cars = getRandomCars();
      Promise.all(cars.map((car) => GarageService.createCar(car))).then(() =>
        Store.updateGarage().then(() => {
          Store.garage.carTracks.onGenerate();
          Store.garage.update(true);
        })
      );
    });

    this.raceBtn.addEventListener('click', () => {
      Store.garage.startRace();
    });

    this.resetBtn.addEventListener('click', () => {
      Store.garage.resetRace();
    });
  }

  public handleRaceEnd(): void {
    this.resetBtn.on();
  }

  public enable(): void {
    this.raceBtn.on();
    this.generateBtn.on();
  }

  public disable(): void {
    this.raceBtn.off();
    this.resetBtn.off();
    this.generateBtn.off();
  }
}
