import './styles.css';
import { EngineService } from './services/engine.service';
import { GarageService } from './services/garage.service';
import { CarResponse } from './types';

const cars = await GarageService.getCars();
const fragment = document.createDocumentFragment();
const garage: Car[] = [];

class Car {
  public readonly id: number;

  public readonly name: string;

  public readonly color: string;

  public readonly element: HTMLElement;

  constructor({ id, name, color }: CarResponse) {
    this.id = id;
    this.name = name;
    this.color = color;

    this.element = document.createElement('div');
    this.element.style.background = color;
    this.element.style.width = '100px';
    this.element.textContent = name;
  }

  public changeColor(color: string) {
    this.element.style.background = color;
  }

  public async start() {
    const specs = await EngineService.start(this.id);
    const time = specs.distance / specs.velocity;

    this.element.style.animationName = 'start';
    this.element.style.animationDuration = `${time}ms`;
    this.element.style.animationFillMode = 'forwards';
    this.element.style.animationPlayState = 'running';
  }

  public stop() {
    this.element.style.animationPlayState = 'paused';
  }

  public async drive(): Promise<Message> {
    return new Promise((resolve) => {
      EngineService.drive(this.id)
        .then(() => resolve({ message: `Car ${this.name} has finished` }))
        .catch(() => this.stop());
    });
  }

  public reset() {
    this.element.style.animation = '';
    this.element.textContent = this.name;
  }
}

interface Message {
  message: string;
}

cars.forEach((car) => {
  const c = new Car(car);
  garage.push(c);
  fragment.appendChild(c.element);
});

const start: HTMLButtonElement = document.createElement('button');
start.textContent = 'START';
const stop: HTMLButtonElement = document.createElement('button');
stop.textContent = 'STOP';
stop.disabled = true;

document.body.append(start, stop, fragment);

start.addEventListener('click', () => {
  start.disabled = true;
  stop.disabled = false;

  Promise.race(garage.map((car) => car.start().then(() => car.drive()))).then((msg: Message) =>
    console.log(`${msg.message} and won the race!`)
  );
});

stop.addEventListener('click', () => {
  Promise.all(
    garage.map(
      (car) =>
        new Promise((resolve) => {
          resolve(EngineService.stop(car.id).then(() => car.reset()));
        })
    )
  ).then(() => {
    console.log('all cars reseted');
    start.disabled = false;
    stop.disabled = true;
  });
});
