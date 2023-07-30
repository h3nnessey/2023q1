import { ICar } from '../../../../../types';
import { EngineService } from '../../../../../services/engine.service';
import { Component } from '../../../../component';
import { Store } from '../../../../../store';
import content from '../../../../../assets/car.svg';
import classes from './styles.module.css';

export class Car extends Component {
  public readonly id: number;
  public name: string;
  public color: string;
  public started: boolean = false;

  constructor({ id, name, color }: ICar) {
    super({ classNames: [classes.car], html: content });

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
    this.node.style.animationName = classes.start;
    this.node.style.animationDuration = `${time}ms`;
    this.node.style.animationFillMode = 'forwards';
    this.node.style.animationPlayState = 'running';
    this.node.style.animationTimingFunction = 'linear';
  }

  public updateCar(name: string, color: string): void {
    this.color = color;
    this.name = name;
    this.node.style.fill = color;

    const carInStore = Store.garageCars.find((car) => car.id === this.id);
    const carInTracks = Store.garage.carTracks.tracks.find(({ car }) => car.id === this.id);

    if (carInStore) {
      carInStore.name = this.name;
      carInStore.color = this.color;
    }

    if (carInTracks) {
      carInTracks.carName.setTextContent(this.name);
    }
  }

  public stop(): Promise<void> {
    return EngineService.stop(this.id).then(() => this.reset());
  }

  public pause(): void {
    this.addClass(classes.broken);
    this.pauseAnimation();
  }

  public drive(startTime?: number): Promise<ICar & { time: number }> {
    return new Promise((resolve) => {
      EngineService.drive(this.id).then(({ success }) => {
        if (success) {
          const time = startTime ? +((Date.now() - startTime) / 1000).toFixed(2) : 0;
          resolve({
            id: this.id,
            name: this.name,
            color: this.color,
            time,
          });
        } else {
          this.handleDriveFail();
        }
      });
    });
  }

  private handleDriveFail(): void {
    if (!this.started) {
      this.reset();
    } else {
      this.pause();
    }
  }

  private resetAnimation(): void {
    this.node.style.animation = '';
  }

  private pauseAnimation(): void {
    this.node.style.animationPlayState = 'paused';
  }

  public reset(): void {
    this.resetAnimation();
    this.removeClass(classes.broken);
    this.started = false;
  }
}
