import type { GetCarsResponse, ICar } from '../types';
import { GarageService } from '../services/garage.service';
import type { Garage } from '../components/garage';

export class Store {
  public static carsCount: number = 0;
  public static cars: ICar[] = [];
  public static currentPage: string = '1';
  public static garage: Garage;

  public static async initGarage(): Promise<void> {
    return GarageService.getCars(Store.currentPage).then(({ total, items }: GetCarsResponse) => {
      Store.carsCount = total;
      Store.cars = items;
    });
  }
}
