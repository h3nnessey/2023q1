import { Component } from '../../../component';
import { Button } from '../../../button';
import { Store } from '../../../../store';
import { getRandomCars } from '../../../../utils';
import { GarageService } from '../../../../services/garage.service';
import classes from '../styles.module.css';

export class ControlsRace extends Component {
  public readonly raceBtn: Button;
  public readonly resetBtn: Button;
  private readonly generateBtn: Button;

  constructor() {
    super({ classNames: [classes.controlsRow] });

    this.raceBtn = new Button({
      text: 'Race',
      onClick: () => Store.garage.startRace(),
    });

    this.resetBtn = new Button({
      text: 'Reset',
      onClick: () => Store.garage.resetRace(),
      disabled: true,
    });

    this.generateBtn = new Button({ text: 'Generate cars', onClick: () => this.handleGenerateCarsClick() });

    this.append([this.raceBtn, this.resetBtn, this.generateBtn]);
  }

  private handleGenerateCarsClick(): void {
    Promise.all(getRandomCars().map((car) => GarageService.createCar(car))).then(() =>
      Store.updateGarage().then(() => {
        Store.garage.carTracks.onGenerate();
        Store.garage.update(true);
      })
    );
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
