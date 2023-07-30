import { Component } from '../../component';
import { ControlsCreate } from './controls-create';
import { ControlsUpdate } from './controls-update';
import { ControlsRace } from './controls-race';
import { Store } from '../../../store';
import classes from './styles.module.css';

export class Controls extends Component {
  private readonly controlsCreate: ControlsCreate;
  public readonly controlsUpdate: ControlsUpdate;
  public readonly controlsRace: ControlsRace;

  constructor() {
    super({ classNames: [classes.controls] });

    this.controlsCreate = new ControlsCreate();
    this.controlsUpdate = new ControlsUpdate();
    this.controlsRace = new ControlsRace();

    this.append([this.controlsCreate, this.controlsUpdate, this.controlsRace]);
  }

  public disable(): void {
    this.controlsCreate.disable();
    this.controlsUpdate.disable();
    this.controlsRace.disable();
    Store.garage.carTracks.disable();
  }

  public enable(): void {
    this.controlsRace.enable();
    this.controlsCreate.enable();
  }

  public handleRaceEnd(): void {
    this.controlsRace.handleRaceEnd();
  }

  public update(): void {
    this.controlsUpdate.disable();
  }
}
