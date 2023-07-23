import { ICar } from '../../../../../types';
import { EngineService } from '../../../../../services/engine.service';
import { Component } from '../../../../component';
import { svgContent } from './svg-content';

export class Car extends Component {
  public readonly id: number;
  public readonly name: string;
  public readonly color: string;

  constructor(parent: Component, { id, name, color }: ICar) {
    super({ classNames: ['car'], parent, html: svgContent });

    this.id = id;
    this.name = name;
    this.color = color;

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
    return EngineService.stop(this.id).then(() => {
      this.reset();
    });
  }

  public pause() {
    this.node.style.animationPlayState = 'paused';
  }

  public drive(): Promise<{ name: string }> {
    return new Promise((resolve, reject) => {
      EngineService.drive(this.id)
        .then(() => resolve({ name: this.name }))
        .catch(() => {
          this.pause();
          reject();
        });
    });
  }

  public reset() {
    this.node.style.animation = '';
  }
}
