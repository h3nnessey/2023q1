import { Component } from '../component';
import { Controls } from './controls';
import { CarsCount } from './cars-count';
import { Pagination } from './pagination';
import { CarTracks } from './car-tracks';
import { Store } from '../../store';

export class Garage extends Component {
  private readonly controls: Controls;
  private readonly carsCount: CarsCount;
  private readonly pagination: Pagination;
  public readonly carTracks: CarTracks;

  constructor(parent: Component) {
    super({ tagName: 'div', parent, classNames: ['garage'] });

    Store.garage = this;

    this.controls = new Controls(this);
    this.carsCount = new CarsCount(this);
    this.pagination = new Pagination(this);
    this.carTracks = new CarTracks(this);
  }
}
