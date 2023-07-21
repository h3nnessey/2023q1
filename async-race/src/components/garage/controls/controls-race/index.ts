import { Component } from '../../../component';
import { Button } from '../../../button';
import { Store } from '../../../../store';

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
    this.raceBtn.addEventListener('click', () => {
      this.raceBtn.off();
      Store.garage.carTracks.node.dispatchEvent(
        new CustomEvent('race-start', {
          detail: {
            enableResetBtn: this.resetBtn.on.bind(this.resetBtn),
          },
        })
      );
    });

    this.resetBtn.addEventListener('click', () => {
      this.resetBtn.off();
      Store.garage.carTracks.node.dispatchEvent(
        new CustomEvent('race-reset', {
          detail: {
            enableRaceBtn: this.raceBtn.on.bind(this.raceBtn),
          },
        })
      );
    });
  }
}
