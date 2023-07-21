import { Component } from '../component';
import { InputType } from '../../types';

export class Input extends Component {
  private readonly input: HTMLInputElement;

  constructor({ parent, type = 'text', disabled }: { parent: Component; type?: InputType; disabled?: boolean }) {
    super({ tagName: 'input', parent });

    this.input = this.node as HTMLInputElement;

    this.setAttribute('type', type);

    if (disabled) this.off();
  }

  public get value(): string {
    return this.input.value;
  }

  public set value(newValue: string) {
    this.input.value = newValue;
  }

  public on(): void {
    this.input.disabled = false;
  }

  public off(): void {
    this.input.disabled = true;
  }
}
