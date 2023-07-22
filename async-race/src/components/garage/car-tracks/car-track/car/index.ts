import { ICar } from '../../../../../types';
import { EngineService } from '../../../../../services/engine.service';
import { Component } from '../../../../component';
import { svgContent } from './svg-content';

export class Car extends Component {
  public readonly id: number;
  public readonly name: string;

  constructor(parent: Component, { id, name, color }: ICar) {
    super({ classNames: ['car'], parent, html: svgContent });

    this.id = id;
    this.name = name;

    this.node.style.fill = color;
  }

  public async start() {
    const specs = await EngineService.start(this.id);
    const time = specs.distance / specs.velocity;

    this.node.style.animationName = 'start';
    this.node.style.animationDuration = `${time}ms`;
    this.node.style.animationFillMode = 'forwards';
    this.node.style.animationPlayState = 'running';
  }

  public stop() {
    this.node.style.animationPlayState = 'paused';
  }

  public async drive(): Promise<{ message: string }> {
    return new Promise((resolve) => {
      EngineService.drive(this.id)
        .then(() => resolve({ message: `Car ${this.name} has finished` }))
        .catch(() => this.stop());
    });
  }

  public reset() {
    this.node.style.animation = '';
  }
}
