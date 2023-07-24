import { ICar } from '../../../../../types';
import { EngineService } from '../../../../../services/engine.service';
import { Component } from '../../../../component';
import { svgContent } from '../../../../../data/svg-content';
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

        this.setAnimation(specs.distance / specs.velocity);

        resolve(startTime);
      });
    });
  }

  private setAnimation(time: number): void {
    this.node.style.animationName = 'start';
    this.node.style.animationDuration = `${time}ms`;
    this.node.style.animationFillMode = 'forwards';
    this.node.style.animationPlayState = 'running';
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
    this.addClass('broken');
    this.node.style.animationPlayState = 'paused';
  }

  public drive(startTime?: number): Promise<ICar & { time: number }> {
    return new Promise((resolve, reject) => {
      EngineService.drive(this.id)
        .then(() => {
          let time = startTime ? +((Date.now() - startTime) / 1000).toFixed(2) : 0;
          if (time.toString().length >= 5) time = Math.floor(time);
          resolve({
            id: this.id,
            name: this.name,
            color: this.color,
            time,
          });
        })
        .catch(() => {
          this.pause();
          reject();
        });
    });
  }

  public reset() {
    this.removeClass('broken');
    this.node.style.animation = '';
    this.started = false;
  }
}
