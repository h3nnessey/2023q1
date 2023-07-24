import type { GetCarsResponse, ICar } from '../types';
import { GarageService } from '../services/garage.service';
import type { Garage } from '../components/garage';

export class Store {
  public static carsCount: number = 0;
  public static cars: ICar[] = [];
  public static currentPage: number = 1;
  public static pagesCount: number = 1;
  public static garage: Garage;

  public static async initGarage(): Promise<void> {
    await Store.getGarageData();
  }

  public static async updateGarage(): Promise<void> {
    await Store.getGarageData();
  }

  private static async getGarageData(): Promise<void> {
    return GarageService.getCars(Store.currentPage).then(({ total, items }: GetCarsResponse) => {
      console.log(
        items.map((car) => car.id),
        Array.from(new Set(items.map((car) => car.id))).length
      );
      Store.cars = items;
      Store.carsCount = total;
      Store.pagesCount = Math.ceil(total / 7) || 1;
    });
  }
}
