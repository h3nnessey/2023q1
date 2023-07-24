import { ICar } from '../../../../../types';
import { EngineService } from '../../../../../services/engine.service';
import { Component } from '../../../../component';
import { svgContent } from './svg-content';
import { Store } from '../../../../../store';

export class Car extends Component {
  public readonly id: number;
  public name: string;
  public color: string;
  public started: boolean = false;

  constructor(parent: Component, { id, name, color }: ICar) {
    super({ classNames: ['car'], parent, html: svgContent });

    this.id = id;
    this.name = name;
    this.color = color;

    this.node.style.fill = color;
  }

  public async start(): Promise<number> {
    return new Promise((resolve) => {
      EngineService.start(this.id).then((specs) => {
        this.reset();
        this.started = true;

        const startTime = Date.now();
        const time = specs.distance / specs.velocity;

        this.node.style.animationName = 'start';
        this.node.style.animationDuration = `${time}ms`;
        this.node.style.animationFillMode = 'forwards';
        this.node.style.animationPlayState = 'running';

        resolve(startTime);
      });
    });
  }

  public updateCar(name: string, color: string) {
    this.color = color;
    this.name = name;
    this.node.style.fill = color;
  }

  public stop() {
    return EngineService.stop(this.id).then(() => {
      this.started = false;
      this.reset();
    });
  }

  public pause() {
    this.node.style.animationPlayState = 'paused';
  }

  public drive(startTime?: number): Promise<ICar & { time: string | null }> {
    return new Promise((resolve, reject) => {
      EngineService.drive(this.id)
        .then(() =>
          resolve({
            id: this.id,
            name: this.name,
            color: this.color,
            time: startTime ? ((Date.now() - startTime) / 1000).toFixed(2) : null,
          })
        )
        .catch(() => {
          this.pause();
          reject();
        });
    });
  }

  public reset() {
    this.node.style.animation = '';
    this.started = false;
  }
}
