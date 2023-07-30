import { Component } from '../component';
import { InputType } from '../../types';
import './styles.module.css';

export class Input extends Component {
  private readonly input: HTMLInputElement;

  constructor({
    parent,
    type = 'text',
    disabled,
    placeholder = '',
  }: {
    parent: Component;
    type?: InputType;
    disabled?: boolean;
    placeholder?: string;
  }) {
    super({ tagName: 'input', parent });

    this.input = this.node as HTMLInputElement;

    this.setAttribute('type', type);
    this.setAttribute('placeholder', placeholder);

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
