import { Component } from '../../component';
import { ControlsCreate } from './controls-create';
import { ControlsUpdate } from './controls-update';
import { ControlsRace } from './controls-race';

export class Controls extends Component {
  private readonly controlsCreate: ControlsCreate;
  public readonly controlsUpdate: ControlsUpdate;
  private readonly controlsRace: ControlsRace;

  constructor(parent: Component) {
    super({ tagName: 'div', classNames: ['garage__controls'], parent });

    this.controlsCreate = new ControlsCreate(this);
    this.controlsUpdate = new ControlsUpdate(this);
    this.controlsRace = new ControlsRace(this);
  }

  public disable(): void {
    this.controlsCreate.disable();
    this.controlsUpdate.disable();
    this.controlsRace.disable();
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
